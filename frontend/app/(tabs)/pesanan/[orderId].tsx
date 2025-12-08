import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Car {
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
}

interface Order {
  id: number;
  car_id: number;
  user_id: number;
  method_id: number;
  tanggal_order: string;
  durasi_sewa: number;
  tanggal_sewa: string;
  tanggal_kembali_sewa: string;
  tanggal_transaksi: string;
  status_order: string;
  total_harga: number;
}

const BASE_URL = "http://127.0.0.1:8000";

async function fetchPesananById(orderId: string) {
  try {
    const token = await AsyncStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/order/id/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await res.json();
    return data.order; // correct field
  } catch (err) {
    console.log("Fetch order by id error:", err);
    return null;
  }
}

async function fetchCarById(id: number) {
  try {
    const token = await AsyncStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/cars/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await res.json();
    return data.car; // correct field
  } catch (err) {
    console.log("Fetch car error:", err);
    return null;
  }
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoChip}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export default function OrderDetailScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [car, setCar] = useState<Car | null>(null);

    useFocusEffect(
    useCallback(() => {
        const load = async () => {
        const orderData = await fetchPesananById(orderId);
        if (orderData) {
            setOrder(orderData);
            const carData = await fetchCarById(orderData.car_id);
            if (carData) setCar(carData);
        }
        };

        load();
    }, [orderId])
    );


  if (!order) {
    return (
      <View style={styles.root}>
        <AppBar title="Loading..." onBack={() => router.replace("/pesanan")} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
        <AppBar
        title="Detail Mobil"
        onBack={() => router.replace("/pesanan")}
        />

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={styles.sectionTitle}>Mobil yang Disewa</Text>

        {car && (
          <View style={styles.stackedCard}>
            <Image
              source={{ uri: `${car.foto_mobil}` }}
              style={styles.cardImage}
            />
            <View style={styles.cardInfo}>
              <Text style={styles.carName}>
                {car.merk_mobil} {car.nama_mobil}
              </Text>
              <Text style={styles.carYear}>{car.tahun_mobil}</Text>

              <Text style={styles.specs}>
                Jenis: {car.jenis_mobil} | Transmisi: {car.tipe_transmisi} | Mesin:{" "}
                {car.tipe_mesin}
              </Text>
            </View>
          </View>
        )}

        <PrimaryButton
          label="Penalti"
          onPress={() => router.push("/penalty")}
          iconLeft={<Text style={{ color: colors.primaryText }}>⚠️</Text>}
          style={{ marginBottom: spacing.xl }}
        />

        <Text style={styles.sectionTitle}>Informasi Pesanan</Text>

        <View style={styles.row}>
          <InfoChip label="Tanggal Order" value={order.tanggal_order} />
          <InfoChip
            label="Total Harga"
            value={`Rp ${order.total_harga.toLocaleString("id-ID")}`}
          />
        </View>

        <View style={styles.infoWide}>
          <Text style={styles.infoLabel}>Status</Text>
          <Text style={styles.statusValue}>{order.status_order}</Text>
        </View>

        <View style={styles.row}>
          <InfoChip label="Tanggal Sewa" value={order.tanggal_sewa} />
          <Text style={styles.dash}>-</Text>
          <InfoChip
            label="Tanggal Kembali"
            value={order.tanggal_kembali_sewa}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  sectionTitle: {
    ...typography.h2,
    textAlign: "center",
    marginBottom: spacing.md,
  },

  stackedCard: {
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: spacing.lg,
    backgroundColor: colors.surfaceGreige,
  },
  cardImage: { width: "100%", height: 220 },
  cardInfo: { padding: spacing.lg },
  carName: { ...typography.h2 },
  carYear: { ...typography.body, marginTop: 2, marginBottom: spacing.sm },
  specs: { ...typography.small, color: colors.text },

  row: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "center",
    marginBottom: spacing.md,
  },

  infoChip: {
    flex: 1,
    backgroundColor: colors.surfaceGreige,
    borderRadius: 16,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  infoWide: {
    backgroundColor: colors.surfaceGreige,
    borderRadius: 16,
    paddingVertical: spacing.md,
    alignItems: "center",
    marginBottom: spacing.md,
  },

  infoLabel: { ...typography.small, color: colors.text },
  infoValue: { ...typography.h3 },
  statusValue: { ...typography.h2 },
  dash: { ...typography.h2 },
});
