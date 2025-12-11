import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { GreigePanel } from "@/components/Card";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Car {
  id: number;
  tahun_mobil: string;
  merk_mobil: string;
  nama_mobil: string;
  jenis_mobil: string;
  tipe_mesin: string;
  tipe_transmisi: string;
  harga_sewa: number;
  foto_mobil: string;
  status_mobil: boolean;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
}

interface PaymentMethod {
  id: number;
  nama_method: string;
}

function WhitePill({ children, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ width: "100%" }}>
      <View style={styles.whitePill}>{children}</View>
    </TouchableOpacity>
  );
}

export default function RentCarScreen() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [activePicker, setActivePicker] = useState<"start" | "end" | null>(null);

  // const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

  // 1) Load mobil yang dipilih dari AsyncStorage ketika kembali dari car-detail
//   useEffect(() => {
//     const loadCar = async () => {
//       try {
//         const saved = await AsyncStorage.getItem("selectedCar");
//         if (saved) {
//           setSelectedCar(JSON.parse(saved));
//           await AsyncStorage.removeItem("selectedCar");
//         }
//       } catch (e) {
//         console.log("Error loading selectedCar:", e);
//       }
//     };

//     loadCar();
//   }, []);

  // 2) Ambil metode pembayaran dari backend
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const res = await fetch("http://localhost:8001/api/transaction-methods", {
          headers: { Accept: "application/json" },
        });

        const json = await res.json();
        // Sesuaikan dengan bentuk response controller-mu
        const list: PaymentMethod[] = json.data ?? json;
        setPaymentMethods(list);
        if (list.length > 0) setSelectedPayment(list[0]);
      } catch (e) {
        console.log("Error fetching payment methods:", e);
      }
    };

    fetchPaymentMethods();
  }, []);

  // Format -> YYYY-MM-DD
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const handleOpenPicker = (type: "start" | "end") => {
    if (Platform.OS === "web") return;
    setActivePicker(type);
    setShowPicker(true);
  };

  const handleSelectDate = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowPicker(false);
    if (!selectedDate) return;

    if (activePicker === "start") setStartDate(selectedDate);
    if (activePicker === "end") setEndDate(selectedDate);
  };

  const isDatePicked = !!startDate && !!endDate;
  const isDateOrderCorrect = !!startDate && !!endDate && startDate <= endDate;
  const isDateValid = isDatePicked && isDateOrderCorrect;

  // Hitung durasi hari
  const rentalDays =
    startDate && endDate
      ? Math.max(
          1,
          Math.round(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
          ) + 1
        )
      : 0;

//   const totalPrice =
//     selectedCar && rentalDays > 0 ? selectedCar.harga_sewa * rentalDays : 0;

  const canSubmit =
    isDateValid !== null;
    // isDateValid && selectedCar !== null && selectedPayment !== null;

  const handleSelectPayment = (method: PaymentMethod) => {
    setSelectedPayment(method);
    setShowPaymentDropdown(false);
  };

  const togglePaymentDropdown = () => {
    setShowPaymentDropdown((prev) => !prev);
  };

//   const goToConfirmation = () => {
//     if (!canSubmit || !startDate || !endDate || !selectedCar || !selectedPayment) {
//       return;
//     }

//     router.push({
//       pathname: "/book-confirm",
//       params: {
//         start: formatDate(startDate),
//         end: formatDate(endDate),
//         days: rentalDays.toString(),
//         carName: `${selectedCar.tahun_mobil} ${selectedCar.merk_mobil} ${selectedCar.nama_mobil}`,
//         dailyPrice: selectedCar.harga_sewa.toString(),
//         totalPrice: totalPrice.toString(),
//         paymentMethod: selectedPayment.nama_method,
//       },
//     });
//   };

  return (
    <View style={styles.root}>
      <AppBar title="Sewa Mobil" onBack={() => router.back()} />

      <View style={styles.content}>
        {/* PILIH TANGGAL */}
        <GreigePanel>
          <Text style={styles.panelTitle}>Pilih Tanggal</Text>

          {Platform.OS === "web" ? (
            <>
              <input
                type="date"
                style={styles.webInput as any}
                value={formatDate(startDate)}
                onChange={(e) => setStartDate(new Date(e.target.value))}
              />

              <Text style={styles.sd}>s/d</Text>

              <input
                type="date"
                style={styles.webInput as any}
                value={formatDate(endDate)}
                onChange={(e) => setEndDate(new Date(e.target.value))}
              />

              {!isDateOrderCorrect && startDate && endDate && (
                <Text style={{ color: "red", marginTop: 8 }}>
                  Tanggal mulai tidak boleh lebih besar dari tanggal selesai.
                </Text>
              )}
            </>
          ) : (
            <>
              <WhitePill onPress={() => handleOpenPicker("start")}>
                <Text style={styles.pillText}>
                  {startDate ? formatDate(startDate) : "Pilih tanggal mulai"}
                </Text>
              </WhitePill>

              <Text style={styles.sd}>s/d</Text>

              <WhitePill onPress={() => handleOpenPicker("end")}>
                <Text style={styles.pillText}>
                  {endDate ? formatDate(endDate) : "Pilih tanggal selesai"}
                </Text>
              </WhitePill>

              {!isDateOrderCorrect && startDate && endDate && (
                <Text style={{ color: "red", marginTop: 8 }}>
                  Tanggal mulai tidak boleh lebih besar dari tanggal selesai.
                </Text>
              )}
            </>
          )}
        </GreigePanel>

        {Platform.OS !== "web" && showPicker && (
          <DateTimePicker
            value={activePicker === "start" ? startDate || new Date() : endDate || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleSelectDate}
          />
        )}

        {/* PILIH MOBIL */}
        {/* <GreigePanel>
          <Text style={styles.panelTitle}>Pilih Mobil</Text>

          {selectedCar && (
            <View style={styles.selectedCarBox}>
              <Text style={styles.selectedCarName}>
                {selectedCar.tahun_mobil} {selectedCar.merk_mobil} {selectedCar.nama_mobil}
              </Text>
              <Text style={styles.selectedCarPrice}>
                IDR {selectedCar.harga_sewa.toLocaleString("id-ID")} / hari
              </Text>
            </View>
          )}

          <PrimaryButton
            label={selectedCar ? "Ganti Mobil" : "Lihat Mobil"}
            onPress={() =>
              router.push({
                pathname: "/car-list",
                params: {
                  start: startDate ? formatDate(startDate) : "",
                  end: endDate ? formatDate(endDate) : "",
                },
              })
            }
            iconLeft={<Text style={{ color: colors.primaryText }}>🚗</Text>}
            disabled={!isDateValid}
          />
        </GreigePanel> */}

        {/* PILIH PEMBAYARAN */}
        {/* <GreigePanel>
          <Text style={styles.panelTitle}>Pilih Pembayaran</Text>

          <WhitePill onPress={togglePaymentDropdown}>
            <View style={styles.rowBetween}>
              <Text style={styles.pillText}>
                {selectedPayment ? selectedPayment.nama_method : "Pilih Pembayaran"}
              </Text>
              <Text style={styles.chevron}>{showPaymentDropdown ? "▲" : "▼"}</Text>
            </View>
          </WhitePill>

          {showPaymentDropdown && (
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
                      selectedPayment?.id === m.id && styles.dropdownItemActive,
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
        </GreigePanel> */}

        {/* TOMBOL SEWA */}
        <PrimaryButton
          label="Pilih Mobil"
          onPress={() =>
              router.push({
                pathname: "/car-list",
                params: {
                  start: startDate ? formatDate(startDate) : "",
                  end: endDate ? formatDate(endDate) : "",
                },
              })
            }
          disabled={!canSubmit}
          style={{ marginTop: spacing.xl }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg },

  panelTitle: {
    ...typography.h1,
    textAlign: "center",
    marginBottom: spacing.md,
  },

  whitePill: {
    backgroundColor: colors.whitePill,
    borderRadius: 999,
    minHeight: 44,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },

  pillText: { ...typography.body, fontWeight: "700" },
  sd: { textAlign: "center", marginVertical: spacing.sm },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },

  webInput: {
    width: "94%",
    padding: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: spacing.sm,
    fontSize: 16,
  },

  selectedCarBox: {
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
    alignItems: "center",
  },
  selectedCarName: {
    ...typography.body,
    fontWeight: "700",
  },
  selectedCarPrice: {
    ...typography.small,
    marginTop: 4,
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
});
