import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { AppBar } from "@/components/AppBar";
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
}

const fetchCar = async (id: string): Promise<Car | null> => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return null;

        const res = await fetch(`http://localhost:8000/api/cars/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
        });

        const data = await res.json();
        return data.cars;
    } catch (err) {
        console.log("Fetch cars error:", err);
        return null;
    }
};

function Chip({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.chip}>
            <Text style={styles.chipLabel}>{label}</Text>
            <Text style={styles.chipValue}>{value}</Text>
        </View>
    );
}

export default function CarDetailScreen() {
    const { carId, start, end } = useLocalSearchParams<{ carId: string;
    start?: string;
    end?: string; }>(); // FIXED
    const [car, setCar] = useState<Car | null>(null);

    useEffect(() => {
        if (carId) {
            fetchCar(carId).then((fetchedCar) => {
                if (fetchedCar) setCar(fetchedCar);
            });
        }
    }, [carId]);

    if (!car) {
        return (
            <View style={styles.root}>
                <AppBar title="" onBack={() => router.back()} />
                <Text style={{ padding: 20 }}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.root}>
            <AppBar title="" onBack={() => router.back()} rightIcon="bell-o" />

            <ScrollView>
                <Image source={{ uri: car.foto_mobil }} style={styles.hero} />

                <View style={styles.sheet}>
                    <Text style={styles.titleCenter}>
                        {car.tahun_mobil} {car.merk_mobil} {car.nama_mobil}
                    </Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Informasi Mobil</Text>

                    <View style={styles.chipGridRow}>
                        <Chip label="Merk" value={car.merk_mobil} />
                        <Chip label="Tahun" value={car.tahun_mobil} />
                    </View>

                    <View style={styles.chipWide}>
                        <Text style={styles.chipLabel}>Nama</Text>
                        <Text style={styles.chipValue}>{car.nama_mobil}</Text>
                    </View>

                    <View style={styles.chipGridRow}>
                        <Chip label="Jenis" value={car.jenis_mobil} />
                        <Chip label="Tipe Mesin" value={car.tipe_mesin} />
                        <Chip label="Transmisi" value={car.tipe_transmisi} />
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Informasi Sewa</Text>

                    <View style={styles.chipWide}>
                        <Text style={styles.chipLabel}>Status</Text>
                        <Text style={styles.chipValue}>
                            {car.status_mobil ? "Tersedia" : "Tidak tersedia"}
                        </Text>
                    </View>

                    <View style={styles.chipWide}>
                        <Text style={styles.chipLabel}>Harga Sewa</Text>
                        <Text style={styles.chipValue}>
                            IDR {car.harga_sewa.toLocaleString("id-ID")} / hari
                        </Text>
                    </View>

                    <PrimaryButton
                        label="Pilih Mobil"
                        onPress={async () => {
                            try {
                                // opsional: simpan ke storage
                                await AsyncStorage.setItem("selectedCar", JSON.stringify(car));

                                // nama mobil yang enak dibaca
                                const carName = `${car!.tahun_mobil} ${car!.merk_mobil} ${car!.nama_mobil}`;

                                router.push({
                                pathname: "/order-confirm/[newOrderId]",
                                params: {
                                        // untuk sekarang boleh pakai 'preview' dulu,
                                        // nanti setelah ada API create order, isi dengan id order baru
                                        newOrderId: "preview",
                                        start: start ?? "",
                                        end: end ?? "",
                                        carName,
                                        dailyPrice: car!.harga_sewa.toString(),
                                    },
                                });
                            } catch (error) {
                                console.log("Error saving car:", error);
                            }
                        }}
                        style={{ marginTop: spacing.lg }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },
    hero: { width: "100%", height: 420 },

    sheet: {
        marginTop: -18,
        backgroundColor: colors.bg,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        padding: spacing.lg,
    },

    titleCenter: {
        ...typography.h1,
        textAlign: "center",
        marginBottom: spacing.sm,
    },

    divider: {
        height: 1,
        backgroundColor: colors.divider,
        marginVertical: spacing.md,
    },

    sectionTitle: {
        ...typography.h2,
        textAlign: "center",
        marginBottom: spacing.md,
    },

    chipGridRow: {
        flexDirection: "row",
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },

    chip: {
        flex: 1,
        backgroundColor: colors.surfaceGreige,
        borderRadius: 16,
        paddingVertical: spacing.md,
        alignItems: "center",
        justifyContent: "center",
    },

    chipWide: {
        backgroundColor: colors.surfaceGreige,
        borderRadius: 16,
        paddingVertical: spacing.md,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.sm,
    },

    chipLabel: { ...typography.small, color: colors.text },
    chipValue: { ...typography.h3 },
});
