import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { AppBar } from "@/components/AppBar";
import { GreigePanel } from "@/components/Card";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { Car } from "@/types/models";
import AsyncStorage from "@react-native-async-storage/async-storage";

function calculateDays(start: string, end: string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const diff = endDate.getTime() - startDate.getTime();
  const days = diff / (1000 * 60 * 60 * 24);

  return Math.ceil(days); // round up just in case
}


export default function BookingSummaryScreen() {
  const [car, setCar] = useState<Car | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const { start, end } = useLocalSearchParams<{ 
    start?: string;
    end?: string;
  }>();

  useEffect(() => {
    const loadData = async () => {
      const dataUserId = await AsyncStorage.getItem("user_id");
      const dataToken = await AsyncStorage.getItem("token");
      const dataCar = await AsyncStorage.getItem("selectedCar");

      setUserId(dataUserId);
      setToken(dataToken);

      if (dataCar) {
        setCar(JSON.parse(dataCar));
        // await AsyncStorage.removeItem("selectedCar");
      }
    };

    loadData();
  }, []);
      

  return (
    <View style={styles.root}>
      <AppBar title="Konfirmasi Pesanan" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Panel 1: Periode Sewa */}
        <GreigePanel>
          <Text style={styles.sectionTitle}>Periode Sewa</Text>

          <View style={styles.itemRow}>
            <Text style={styles.label}>Tanggal Mulai</Text>
            <Text style={styles.value}>{start}</Text>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.label}>Tanggal Selesai</Text>
            <Text style={styles.value}>{end}</Text>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.label}>Durasi</Text>
            <Text style={styles.value}>
              { calculateDays(start as string, end as string) } Hari
            </Text>
          </View>
        </GreigePanel>

        {/* Panel 2: Detail Mobil */}
        <GreigePanel>
          <Text style={styles.sectionTitle}>Detail Mobil</Text>

          <View style={styles.itemRow}>
            <Text style={styles.label}>Nama Mobil</Text>
            <Text style={styles.value}>{car?.nama_mobil}</Text>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.label}>Harga / Hari</Text>
            <Text style={styles.value}>
              IDR {car?.harga_sewa.toLocaleString("id-ID")}
            </Text>
          </View>
        </GreigePanel>

        {/* Panel 3: Metode Pembayaran */}
        <GreigePanel>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
        </GreigePanel>

        {/* Panel 4: Ringkasan Biaya */}
        <GreigePanel>
          <Text style={styles.sectionTitle}>Ringkasan Biaya</Text>

          <View style={styles.itemRow}>
            <Text style={styles.label}>Biaya Sewa</Text>
            <Text style={styles.value}>
              IDR {car?.harga_sewa.toLocaleString("id-ID")} x {calculateDays(start as string, end as string)} Hari
            </Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalLabel}>
              IDR {car ? (car.harga_sewa * calculateDays(start as string, end as string)).toLocaleString("id-ID") : "0"}
            </Text>
          </View>
        </GreigePanel>

        <PrimaryButton
          label={""}
          onPress={() => {}}
          disabled={false}
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
