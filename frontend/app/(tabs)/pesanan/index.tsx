import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { AppBar } from "@/components/AppBar";
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

const fetchPesanan = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        const user_id = await AsyncStorage.getItem("user_id");

        if (!token) return null;

        const res = await fetch(`${BASE_URL}/api/orders/user/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        });

        const data = await res.json();
        return data.orders;

    } catch (err) {
        console.log("Fetch order by user id error:", err);
        return null;
    }
};

const fetchCars = async () => {
    try {
        const token = await AsyncStorage.getItem("token");

        if (!token) return null;

        const res = await fetch(`${BASE_URL}/api/cars`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        });

        const data = await res.json();
        return data.cars;

    } catch (err) {
        console.log("Fetch cars error:", err);
        return null;
    }
};

export default function OrdersScreen() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [cars, setCars] = useState<Car[]>([]);


    useFocusEffect(
        useCallback(() => {
            const loadOrders = async () => {
            const ordersData = await fetchPesanan();
            const carsData = await fetchCars();
            if (ordersData) setOrders(ordersData);
            if (carsData) setCars(carsData);
            };

            loadOrders();
        }, [])
    );


    return (
        <View style={styles.root}>
            <AppBar title="Pesanan" />

            <FlatList
                data={orders}
                keyExtractor={(o) => o.id.toString()}
                contentContainerStyle={{ padding: spacing.lg }}
                renderItem={({ item }) => {

                    // cari mobil berdasarkan car_id
                    const car = cars.find((c) => c.id === item.car_id);

                    return (
                        <TouchableOpacity onPress={() => router.push(`/pesanan/${item.id}`)}>
                            <View style={styles.orderCard}>

                                <View style={{ flex: 1 }}>
                                    <Text style={styles.orderTitle}>
                                        {car
                                            ? `${car.tahun_mobil} ${car.merk_mobil} ${car.nama_mobil}`
                                            : "Mobil tidak ditemukan"}
                                    </Text>

                                    <Text style={styles.orderDates}>
                                        {new Date(item.tanggal_sewa).toLocaleDateString()} -{" "}
                                        {new Date(item.tanggal_kembali_sewa).toLocaleDateString()}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },

    orderCard: {
        flexDirection: "row",
        backgroundColor: "#EFE8F2",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#D6CFDA",
        padding: spacing.md,
        alignItems: "center",
        marginBottom: spacing.lg,
    },

    orderTitle: { ...typography.h3 },
    orderDates: { ...typography.small, marginTop: 4 },

    thumb: {
        width: 70,
        height: 56,
        borderRadius: 8,
        marginLeft: spacing.md,
    },
});
