import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
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
import AwesomeAlert from "react-native-awesome-alerts";


const BASE_URL = "http://127.0.0.1:8000";

function calculateDays(start: string, end: string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const diff = endDate.getTime() - startDate.getTime();
  const days = diff / (1000 * 60 * 60 * 24);

  return Math.ceil(days) + 1;
}

function formatNow() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function postOrder(
  carId: number,
  userId: number,
  methodId: number,
  tanggalSewa: string,
  tanggalKembaliSewa: string,
  durasiSewa: number,
  totalHarga: number
) {
  try {
    const token = await AsyncStorage.getItem("token");
    const now = formatNow(); // format YYYY-MM-DD

    const res = await fetch(`${BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        car_id: carId,
        user_id: userId,
        method_id: methodId,
        tanggal_order: now,        // NOW
        durasi_sewa: durasiSewa,
        tanggal_sewa: tanggalSewa,
        tanggal_kembali_sewa: tanggalKembaliSewa,
        tanggal_transaksi: now,    // NOW
        status_order: "Ongoing",   // ALWAYS
        total_harga: totalHarga,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("error :", err);
    return null;
  }
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
  const [showSuccess, setShowSuccess] = useState(false);
  const { start, end } = useLocalSearchParams<{
    start?: string;
    end?: string;
  }>();
  const durasiSewa = calculateDays(start as string, end as string);

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
              {durasiSewa} Hari
            </Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalLabel}>
              IDR{" "}
              {car ? (car.harga_sewa * durasiSewa).toLocaleString("id-ID") : "0"}
            </Text>
          </View>
        </GreigePanel>

        <PrimaryButton
          label="Konfirmasi & Buat Pesanan"
          onPress={async () => {
            if (!car || !userId || !selectedMethod) return;

            const total = car.harga_sewa * durasiSewa;

            const result = await postOrder(
              car.id,
              parseInt(userId),
              selectedMethod,
              start as string,
              end as string,
              durasiSewa,
              total
            );

            if (result) {
              setShowSuccess(true);
            } else {
              Alert.alert("Error", "Terjadi kesalahan membuat pesanan.");
            }
          }}

          disabled={!selectedMethod}
          style={{ marginTop: spacing.lg, marginBottom: spacing.lg }}
        />
      </ScrollView>

      <AwesomeAlert
        show={showSuccess}
        showProgress={false}
        title="🎉 Pesanan Berhasil!"
        message="Pesanan kamu sudah dibuat. Silakan cek halaman pesanan."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Lanjut"
        confirmButtonColor="#4CAF50"
        titleStyle={{ fontSize: 22, fontWeight: "700", textAlign: "center" }}
        messageStyle={{ fontSize: 16, textAlign: "center" }}
        confirmButtonStyle={{ paddingHorizontal: 20 }}
        onConfirmPressed={() => {
          setShowSuccess(false);
          router.replace("/pesanan");
        }}
      />

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
