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

    // useEffect(() => {
    //   const loadCar = async () => {
    //     const saved = await AsyncStorage.getItem("selectedCar");
    //     if (saved) {
    //       setSelectedCar(JSON.parse(saved));
    //       await AsyncStorage.removeItem("selectedCar");
    //     }
    //   };

    //   loadCar();
    // }, []);

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

  const isDatePicked = startDate && endDate;
  const isDateOrderCorrect = startDate && endDate && startDate <= endDate;
  const isDateValid = isDatePicked && isDateOrderCorrect;

  return (
    <View style={styles.root}>
      <AppBar title="Sewa Mobil" onBack={() => router.back()} />

      <View style={styles.content}>
        <GreigePanel>
          <Text style={styles.panelTitle}>Pilih Tanggal</Text>

          {Platform.OS === "web" ? (
            <>
              <input
                type="date"
                style={styles.webInput}
                value={formatDate(startDate)}
                onChange={(e) => setStartDate(new Date(e.target.value))}
              />

              <Text style={styles.sd}>s/d</Text>

              <input
                type="date"
                style={styles.webInput}
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

        <GreigePanel>
          <Text style={styles.panelTitle}>Pilih Mobil</Text>

          <PrimaryButton
            label="Lihat Mobil"
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
        </GreigePanel>

        <GreigePanel>
          <Text style={styles.panelTitle}>Pilih Pembayaran</Text>

          <WhitePill onPress={() => {}}>
            <View style={styles.rowBetween}>
              <Text style={styles.pillText}>Bayar di Toko</Text>
              <Text style={{ fontSize: 18 }}>⌄</Text>
            </View>
          </WhitePill>
        </GreigePanel>

        {/* <PrimaryButton
          label="Sewa"
          onPress={() => {
            router.push({
              pathname: "/booking"
            })
          }
          }
          disabled={selectedCar === null ? true : false}
          style={{ marginTop: spacing.xl }}
        /> */}
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
});
