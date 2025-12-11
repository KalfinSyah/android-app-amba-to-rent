import React, { useEffect, useState } from "react";
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
import { Car, TransactionMethod } from "@/types/models";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://127.0.0.1:8000";

function calculateDays(start: string, end: string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const diff = endDate.getTime() - startDate.getTime();
  const days = diff / (1000 * 60 * 60 * 24);

  return Math.ceil(days);
}

async function fetchPaymentMethods() {
  try {
    const token = await AsyncStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/orders/methods`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await res.json();
    return data.orders;
  } catch (err) {
    console.log("error :", err);
    return null;
  }
}

export default function BookingSummaryScreen() {
  const [car, setCar] = useState<Car | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [paymentMethods, setPaymentMethods] = useState<TransactionMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);

  const { start, end } = useLocalSearchParams<{
    start?: string;
    end?: string;
  }>();

  useEffect(() => {
    const loadData = async () => {
      const dataUserId = await AsyncStorage.getItem("user_id");
      const dataToken = await AsyncStorage.getItem("token");
      const dataCar = await AsyncStorage.getItem("selectedCar");
      const dataPaymentMethods = await fetchPaymentMethods();

      setUserId(dataUserId);
      setToken(dataToken);
      setPaymentMethods(dataPaymentMethods || []);

      if (dataCar) {
        setCar(JSON.parse(dataCar));
      }
    };

    loadData();
  }, []);

  return (
    <View style={styles.root}>
      <AppBar title="Konfirmasi Pesanan" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Periode */}
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
              {calculateDays(start as string, end as string)} Hari
            </Text>
          </View>
        </GreigePanel>

        {/* Detail Mobil */}
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

        {/* Payment Methods */}
        <GreigePanel>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>

          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              onPress={() => setSelectedMethod(method.id)}
              style={[
                styles.paymentItem,
                selectedMethod === method.id && styles.paymentItemSelected,
              ]}
            >
              <Text style={styles.paymentText}>{method.nama_method}</Text>

              {selectedMethod === method.id && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
            
          ))}
        </GreigePanel>

        {/* Ringkasan Biaya */}
        <GreigePanel>
          <Text style={styles.sectionTitle}>Ringkasan Biaya</Text>

          <View style={styles.itemRow}>
            <Text style={styles.label}>Biaya Sewa</Text>
            <Text style={styles.value}>
              IDR {car?.harga_sewa.toLocaleString("id-ID")} x{" "}
              {calculateDays(start as string, end as string)} Hari
            </Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalLabel}>
              IDR{" "}
              {car
                ? (
                    car.harga_sewa *
                    calculateDays(start as string, end as string)
                  ).toLocaleString("id-ID")
                : "0"}
            </Text>
          </View>
        </GreigePanel>

        <PrimaryButton
          label="Buat Pesanan"
          onPress={() => {
            console.log("Selected Method:", selectedMethod);
          }}
          disabled={!selectedMethod}
          style={{ marginTop: spacing.lg, marginBottom: spacing.lg }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
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
  label: { ...typography.small, color: colors.text },
  value: { ...typography.body, fontWeight: "700" },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  totalLabel: { ...typography.h2 },

  paymentItem: {
    padding: spacing.md,
    backgroundColor: colors.whitePill,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },

  paymentItemSelected: {
    backgroundColor: colors.surfaceGreige,
    borderColor: colors.primary,
    borderWidth: 1,
  },

  paymentText: {
    fontSize: 16,
    fontWeight: "600",
  },

  checkmark: {
    fontSize: 18,
    fontWeight: "800",
  },
});
