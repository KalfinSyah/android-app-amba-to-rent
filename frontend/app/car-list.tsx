import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { CarCard } from "@/components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { Car } from "@/types/models";
import { ActivityIndicator } from "react-native";

const fetchCars = async (start: string, end: string): Promise<Car[] | null> => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return null;

        const body = {
            tanggal_sewa: start,
            tanggal_kembali_sewa: end,
        };

        const res = await fetch(`http://localhost:8000/api/cars/available`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return data.cars;

    } catch (err) {
        console.log("Fetch cars error:", err);
        return null;
    }
};

export default function CarListScreen() {
    const params = useLocalSearchParams();
    const start = params.start as string; // tanggal_sewa
    const end = params.end as string;     // tanggal_kembali_sewa

    const [availableCars, setAvailableCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const run = async () => {
            if (!start || !end) return;

            setLoading(true);
            const cars = await fetchCars(start, end);

            if (!mounted) return;
            setAvailableCars(cars ?? []);
            setLoading(false);
        };

        run();

        return () => {
            mounted = false;
        };
    }, [start, end]);


    if (loading) {
        return (
            <View style={styles.root}>
                <AppBar title="Daftar Mobil" onBack={() => router.back()} />
                <View style={styles.loadingWrap}>
                    <ActivityIndicator size="large" color={colors.text} />
                    <Text style={styles.loadingText}>Memuat daftar mobil...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.root}>
            <AppBar
                title="Daftar Mobil"
                rightIcon="search"
                onBack={() => router.back()}
            />

            <FlatList
                data={availableCars}
                keyExtractor={(c) => c.id.toString()}
                contentContainerStyle={{ padding: spacing.lg }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push({pathname: "/car-list/[carId]", params: {carId: item.id.toString(),start, end,},})}>
                        <CarCard image={item.foto_mobil}>
                            <Text style={styles.carName}>{item.nama_mobil}</Text>
                            <Text style={styles.year}>{item.tahun_mobil}</Text>
                            <Text style={styles.specs}>
                                Tipe: {item.jenis_mobil} | Transmisi: {item.tipe_transmisi} | Mesin: {item.tipe_mesin}
                            </Text>

                            <View style={styles.pricePill}>
                                <Text style={styles.priceText}>
                                    IDR {item.harga_sewa.toLocaleString("id-ID")} / hari
                                </Text>
                            </View>
                        </CarCard>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },
    carName: { ...typography.h1 },
    year: { ...typography.body, marginTop: 2, marginBottom: spacing.sm },
    specs: { ...typography.small, color: colors.text },
    pricePill: {
        alignSelf: "flex-end",
        backgroundColor: colors.primary,
        borderRadius: 999,
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginTop: spacing.md,
    },

    priceText: { ...typography.small, color: colors.primaryText, fontWeight: "700" },

    loadingWrap: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.lg,
    },
    loadingText: {
        ...typography.loading,
        marginTop: spacing.md,
        color: colors.muted,
    },

});
