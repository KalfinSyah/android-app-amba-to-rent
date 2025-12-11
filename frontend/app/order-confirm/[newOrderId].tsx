import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppBar } from "@/components/AppBar";
import { GreigePanel } from "@/components/Card";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

type BookingSummaryParams = {
  start?: string;
  end?: string;
  carId?: string;
  carName?: string;
  dailyPrice?: string;
  paymentMethod?: string; // fallback lama
  newOrderId?: string; // nama segment route
};

interface PaymentMethod {
  id: number;
  nama_method: string;
}

// SESUAIKAN dengan port backend-mu (8000 / 8001)
const BASE_URL = "http://localhost:8001";

export default function BookingSummaryScreen() {
  const params = useLocalSearchParams<BookingSummaryParams>();

  // ----- DATA DARI PARAM / FALLBACK DUMMY -----
  const fallbackStart = "2025-01-10";
  const fallbackEnd = "2025-01-13";
  const fallbackCarName = "2022 Toyota Avanza G";
  const fallbackDailyPrice = 350_000;

  const startDateStr = (params.start as string) || fallbackStart;
  const endDateStr = (params.end as string) || fallbackEnd;
  const carName = (params.carName as string) || fallbackCarName;
  const dailyPrice = params.dailyPrice
    ? Number(params.dailyPrice)
    : fallbackDailyPrice;

  // carId diutamakan, kalau belum ada pakai newOrderId hanya sebagai fallback
  const carIdRaw = (params.carId as string) || (params.newOrderId as string) || "";
  const carId = carIdRaw ? Number(carIdRaw) : null;

  // ----- HITUNG DURASI & TOTAL HARGA -----
  const { rentalDays, totalPrice } = useMemo(() => {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      return { rentalDays: 0, totalPrice: 0 };
    }

    const diffMs = end.getTime() - start.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1; // +1 inclusive

    return {
      rentalDays: diffDays,
      totalPrice: diffDays * dailyPrice,
    };
  }, [startDateStr, endDateStr, dailyPrice]);

  // ----- STATE METODE PEMBAYARAN -----
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null
  );
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [loadingPayments, setLoadingPayments] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);

  // ----- STATE BUAT ORDER -----
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Ambil metode pembayaran dari backend
    useEffect(() => {
        const fetchPaymentMethods = async () => {
        try {
            setLoadingPayments(true);
            setErrorMessage(null);

            const res = await fetch(`${BASE_URL}/api/orders`, {
            headers: {
                Accept: "application/json",
            },
            });

            const json = await res.json();
            // Sesuaikan tergantung response: json.data / json.methods / json
            const list: PaymentMethod[] = json.data ?? json.methods ?? json;

            setPaymentMethods(list);
            if (list.length > 0) {
            setSelectedPayment(list[0]); // default pilih pertama
            }
        } catch (e) {
            console.log("Error fetching payment methods:", e);
            setErrorMessage("Gagal memuat metode pembayaran.");
        } finally {
            setLoadingPayments(false);
        }
        };

        fetchPaymentMethods();
    }, []);

    const toggleDropdown = () => {
        if (paymentMethods.length === 0) return;
        setDropdownOpen((prev) => !prev);
    };

    const handleSelectPayment = (method: PaymentMethod) => {
        setSelectedPayment(method);
        setDropdownOpen(false);
    };

    const canConfirm = rentalDays > 0 && !!selectedPayment && !loadingPayments;

    const handleConfirm = () => {
        if (!canConfirm) return;

        // Di sini nanti tinggal disambungkan ke API POST /orders
        // Untuk sementara, cukup log & balik ke tab Pesanan
        console.log("Konfirmasi dengan metode:", selectedPayment);
        router.replace("/(tabs)/pesanan");
    };

  // ----- BUAT PESANAN KE BACKEND -----
  const handleConfirmOrder = async () => {
    if (!carId || rentalDays <= 0 || !selectedPayment) {
      setErrorMessage("Data booking belum lengkap.");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage(null);

      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("user_id");

      if (!token || !userId) {
        setErrorMessage("Sesi login sudah habis. Silakan login ulang.");
        return;
      }

      const body = {
        car_id: carId,
        user_id: Number(userId),
        method_id: selectedPayment.id,
        tanggal_order: new Date().toISOString(),
        tanggal_sewa: startDateStr,
        tanggal_kembali_sewa: endDateStr,
        durasi_sewa: rentalDays,
        total_harga: totalPrice,
        jenis_sewa: 1, // misalnya 1 = sewa harian
        // status_order bisa di-set default di backend (mis. "pending")
      };

      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        console.log("Create order error:", errBody);
        setErrorMessage("Gagal membuat pesanan. Periksa data dan koneksi.");
        return;
      }

      const json = await res.json();
      const createdOrderId =
        json?.order?.id ?? json?.data?.id ?? json?.id ?? null;

      // Setelah sukses, arahkan ke tab Pesanan
      if (createdOrderId) {
        // kalau mau langsung ke detail:
        // router.replace(`/(tabs)/pesanan/${createdOrderId}`);
        router.replace("/(tabs)/pesanan");
      } else {
        router.replace("/(tabs)/pesanan");
      }
    } catch (e) {
      console.log("Unexpected error when creating order:", e);
      setErrorMessage("Terjadi kesalahan saat membuat pesanan.");
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit =
    rentalDays > 0 && !!carId && !!selectedPayment && !loadingPayments;

  return (
    <View style={styles.root}>
      <AppBar title="Konfirmasi Pesanan" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Panel 1: Periode Sewa */}
        <GreigePanel>
          <Text style={styles.sectionTitle}>Periode Sewa</Text>

          <View style={styles.itemRow}>
            <Text style={styles.label}>Tanggal Mulai</Text>
            <Text style={styles.value}>{startDateStr}</Text>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.label}>Tanggal Selesai</Text>
            <Text style={styles.value}>{endDateStr}</Text>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.label}>Durasi</Text>
            <Text style={styles.value}>
              {rentalDays > 0 ? `${rentalDays} hari` : "-"}
            </Text>
          </View>
        </GreigePanel>

        {/* Panel 2: Detail Mobil */}
        <GreigePanel>
          <Text style={styles.sectionTitle}>Detail Mobil</Text>

          <View style={styles.itemRow}>
            <Text style={styles.label}>Nama Mobil</Text>
            <Text style={styles.value}>{carName}</Text>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.label}>Harga / Hari</Text>
            <Text style={styles.value}>
              IDR {dailyPrice.toLocaleString("id-ID")}
            </Text>
          </View>
        </GreigePanel>

        {/* Panel 3: Metode Pembayaran */}
        <GreigePanel>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>

          {loadingPayments ? (
            <Text style={styles.label}>Memuat metode pembayaran...</Text>
          ) : paymentMethods.length === 0 ? (
            <Text style={styles.label}>
              Metode pembayaran belum tersedia. Hubungi admin.
            </Text>
          ) : (
            <>
              {/* Tombol utama dropdown */}
              <TouchableOpacity activeOpacity={0.8} onPress={toggleDropdown}>
                <View style={styles.whitePill}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.pillText}>
                      {selectedPayment
                        ? selectedPayment.nama_method
                        : "Pilih Metode Pembayaran"}
                    </Text>
                    <Text style={styles.chevron}>
                      {dropdownOpen ? "▲" : "▼"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Isi dropdown */}
              {dropdownOpen && (
                <View style={styles.dropdown}>
                  {paymentMethods.map((m) => (
                    <TouchableOpacity
                      key={m.id}
                      activeOpacity={0.8}
                      onPress={() => handleSelectPayment(m)}
                    >
                      <View
                        style={[
                          styles.dropdownItem,
                          selectedPayment?.id === m.id &&
                            styles.dropdownItemActive,
                        ]}
                      >
                        <Text style={styles.dropdownText}>{m.nama_method}</Text>
                        {selectedPayment?.id === m.id && (
                          <Text style={styles.dropdownTick}>✓</Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          )}

          {errorMessage && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
        </GreigePanel>

        {/* Panel 4: Ringkasan Biaya */}
        <GreigePanel>
          <Text style={styles.sectionTitle}>Ringkasan Biaya</Text>

          <View style={styles.itemRow}>
            <Text style={styles.label}>Biaya Sewa</Text>
            <Text style={styles.value}>
              {rentalDays > 0
                ? `IDR ${dailyPrice.toLocaleString(
                    "id-ID"
                  )} x ${rentalDays} hari`
                : "-"}
            </Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              IDR {totalPrice.toLocaleString("id-ID")}
            </Text>
          </View>
        </GreigePanel>

        {errorMessage && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        <PrimaryButton
          label={submitting ? "Memproses..." : "Konfirmasi & Buat Pesanan"}
          onPress={handleConfirmOrder}
          disabled={!canSubmit || submitting}
          style={{ marginTop: spacing.lg, marginBottom: spacing.lg }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.lg,
  },
  col: {
    flex: 1,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
    alignItems: "center",
  },
  label: {
    ...typography.small,
    color: colors.text,
  },
  value: {
    ...typography.body,
    fontWeight: "700",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  totalLabel: {
    ...typography.h2,
  },
  totalValue: {
    ...typography.h2,
    color: colors.primaryText ?? colors.text,
  },

  // Dropdown & select styles
  whitePill: {
    backgroundColor: colors.whitePill,
    borderRadius: 999,
    minHeight: 44,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  pillText: {
    ...typography.body,
    fontWeight: "700",
  },
  chevron: {
    fontSize: 16,
  },
  dropdown: {
    marginTop: 4,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.whitePill,
  },
  dropdownItem: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownItemActive: {
    backgroundColor: colors.surfaceGreige,
  },
  dropdownText: {
    ...typography.body,
  },
  dropdownTick: {
    ...typography.body,
    fontWeight: "700",
  },
  errorText: {
    ...typography.small,
    color: "red",
    marginTop: spacing.sm,
    textAlign: "center",
  },
});
