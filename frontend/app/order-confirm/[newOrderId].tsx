import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { GreigePanel } from "@/components/Card";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

type BookingSummaryParams = {
  newOrderId?: string;
  start?: string;
  end?: string;
  carName?: string;
  dailyPrice?: string;
  paymentMethod?: string;
};

interface PaymentMethod {
  id: number;
  nama_method: string;
}

export default function BookingSummaryScreen() {
  const params = useLocalSearchParams<BookingSummaryParams>();

  // Dummy fallback (kalau param belum di-pass)
  const fallbackStart = "2025-01-10";
  const fallbackEnd = "2025-01-13";
  const fallbackCarName = "2022 Toyota Avanza G";
  const fallbackDailyPrice = 350_000; // IDR

  const startDateStr = params.start || fallbackStart;
  const endDateStr = params.end || fallbackEnd;
  const carName = params.carName || fallbackCarName;
  const dailyPrice = params.dailyPrice
    ? Number(params.dailyPrice)
    : fallbackDailyPrice;

  // =========================
  //   METODE PEMBAYARAN
  // =========================
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentMethod | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        setLoadingPayments(true);
        setPaymentError(null);

        // Sesuaikan base URL & endpoint dengan backend kamu
        const res = await fetch(
          "http://localhost:8001/api/transaction-methods",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const json = await res.json();
        // Tergantung response controller kamu:
        // kalau pakai Resource biasanya di json.data
        const list: PaymentMethod[] = json.data ?? json;
        setPaymentMethods(list);
        if (list.length > 0) setSelectedPayment(list[0]);
      } catch (e) {
        console.log("Error fetching payment methods:", e);
        setPaymentError("Gagal memuat metode pembayaran.");
      } finally {
        setLoadingPayments(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  // =========================
  //   HITUNG DURASI & TOTAL
  // =========================
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

  const canConfirm = rentalDays > 0 && !!selectedPayment;

  const handleConfirm = () => {
    if (!canConfirm) return;

    console.log("Booking confirmed with:", {
      startDateStr,
      endDateStr,
      rentalDays,
      carName,
      dailyPrice,
      totalPrice,
      paymentMethod: selectedPayment?.nama_method,
    });

    // TODO:
    // - Panggil API /api/orders (POST) di backend
    // - Setelah sukses, arahkan ke halaman sukses atau daftar pesanan
    // Contoh sementara:
    router.replace("/pesanan");
  };

  return (
    <View style={styles.root}>
      <AppBar
        title="Konfirmasi Booking"
        onBack={() => router.back()}
      />

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

        {/* Panel 3: Metode Pembayaran (dropdown) */}
        <GreigePanel>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setDropdownOpen((prev) => !prev)}
          >
            <View style={styles.whitePill}>
              <View style={styles.rowBetween}>
                <Text style={styles.pillText}>
                  {selectedPayment
                    ? selectedPayment.nama_method
                    : loadingPayments
                    ? "Memuat metode..."
                    : "Pilih Metode Pembayaran"}
                </Text>
                <Text style={styles.chevron}>
                  {dropdownOpen ? "▲" : "▼"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {dropdownOpen && (
            <View style={styles.dropdown}>
              {paymentMethods.map((m) => (
                <TouchableOpacity
                  key={m.id}
                  activeOpacity={0.8}
                  onPress={() => {
                    setSelectedPayment(m);
                    setDropdownOpen(false);
                  }}
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

          {paymentError && (
            <Text style={styles.errorText}>{paymentError}</Text>
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

        <PrimaryButton
          label="Konfirmasi Booking"
          onPress={handleConfirm}
          disabled={!canConfirm}
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

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
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

  // Dropdown styles (mirip booking.tsx)
  whitePill: {
    backgroundColor: colors.whitePill,
    borderRadius: 999,
    minHeight: 44,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
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
  },
});
