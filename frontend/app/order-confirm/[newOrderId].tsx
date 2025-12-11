import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { GreigePanel } from "@/components/Card";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

type BookingSummaryParams = {
  start?: string;
  end?: string;
  carName?: string;
  dailyPrice?: string;
  paymentMethod?: string;
};

export default function BookingSummaryScreen() {
  // Ambil param kalau nanti kamu sudah kirim dari halaman booking
  const params = useLocalSearchParams<BookingSummaryParams>();

  // Data dummy untuk sementara
  const fallbackStart = "2025-01-10";
  const fallbackEnd = "2025-01-13";
  const fallbackCarName = "2022 Toyota Avanza G";
  const fallbackDailyPrice = 350000; // IDR
  const fallbackPaymentMethod = "Transfer Bank (BCA)";

  const startDateStr = (params.start as string) || fallbackStart;
  const endDateStr = (params.end as string) || fallbackEnd;
  const carName =
    (params.carName as string) || fallbackCarName;
  const dailyPrice =
    params.dailyPrice ? Number(params.dailyPrice) : fallbackDailyPrice;
  const paymentMethod =
    (params.paymentMethod as string) || fallbackPaymentMethod;

  // Hitung durasi hari (inclusive)
  const { rentalDays, totalPrice } = useMemo(() => {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      return { rentalDays: 0, totalPrice: 0 };
    }

    const diffMs = end.getTime() - start.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1; // +1 untuk inclusive
    return {
      rentalDays: diffDays,
      totalPrice: diffDays * dailyPrice,
    };
  }, [startDateStr, endDateStr, dailyPrice]);

  return (
    <View style={styles.root}>
      <AppBar title="Ringkasan Sewa" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Panel 1: Periode Sewa */}
        <GreigePanel>
          <Text style={styles.sectionTitle}>Periode Sewa</Text>

          <View style={styles.rowBetween}>
            <View style={styles.col}>
              <Text style={styles.label}>Tanggal Mulai</Text>
              <Text style={styles.value}>{startDateStr}</Text>
            </View>

            <View style={styles.col}>
              <Text style={styles.label}>Tanggal Selesai</Text>
              <Text style={styles.value}>{endDateStr}</Text>
            </View>
          </View>

          <View style={[styles.rowBetween, { marginTop: spacing.md }]}>
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

          <View style={styles.itemRow}>
            <Text style={styles.label}>Metode</Text>
            <Text style={styles.value}>{paymentMethod}</Text>
          </View>
        </GreigePanel>

        {/* Panel 4: Ringkasan Biaya */}
        <GreigePanel>
          <Text style={styles.sectionTitle}>Ringkasan Biaya</Text>

          <View style={styles.itemRow}>
            <Text style={styles.label}>Biaya Sewa</Text>
            <Text style={styles.value}>
              {rentalDays > 0
                ? `IDR ${dailyPrice.toLocaleString("id-ID")} x ${rentalDays} hari`
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
          label="Konfirmasi Sewa"
          onPress={() => {
            // nanti di sini bisa diarahkan ke:
            // - API booking
            // - halaman sukses
            console.log("Booking confirmed (dummy).");
          }}
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
});