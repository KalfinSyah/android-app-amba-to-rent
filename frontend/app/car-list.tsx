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
import { Modal, Pressable, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const fetchCars = async (start: string, end: string, search?: string): Promise<Car[] | null> => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return null;

        const body: any = {
            tanggal_sewa: start,
            tanggal_kembali_sewa: end,
        };

        if (search && search.trim().length > 0) {
            body.search = search.trim();
        }

        const res = await fetch(`http://localhost:8000/api/cars/available`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return data.cars ?? [];
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

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [appliedSearch, setAppliedSearch] = useState(""); // yang benar-benar dipakai fetch

    useEffect(() => {
        let mounted = true;

        const run = async () => {
            if (!start || !end) return;

            setLoading(true);
            const cars = await fetchCars(start, end, appliedSearch);

            if (!mounted) return;
            setAvailableCars(cars ?? []);
            setLoading(false);
        };

        run();
        return () => { mounted = false; };
    }, [start, end, appliedSearch]);


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
                onRightPress={() => setSearchOpen(true)}
                onBack={() => router.back()}
            />

            <Modal
                visible={searchOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setSearchOpen(false)}
                >
                <Pressable style={styles.searchBackdrop} onPress={() => setSearchOpen(false)} />

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={styles.searchTopWrap}
                >
                    <View style={styles.searchPill}>
                    <FontAwesome name="search" size={18} color={colors.text} />

                    <TextInput
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder="Cari merk atau nama mobil..."
                        placeholderTextColor={colors.muted}
                        style={styles.searchInput}
                        autoFocus
                        returnKeyType="search"
                        onSubmitEditing={() => {
                            setAppliedSearch(searchText);
                            setSearchOpen(false);
                        }}
                    />

                    {!!searchText && (
                        <Pressable onPress={() => setSearchText("")} style={styles.searchIconBtn}>
                        <FontAwesome name="times" size={18} color={colors.text} />
                        </Pressable>
                    )}

                    <Pressable
                        onPress={() => {
                            setAppliedSearch(searchText);
                            setSearchOpen(false);
                        }}
                        style={styles.searchIconBtn}
                    >
                        <FontAwesome name="check" size={18} color={colors.text} />
                    </Pressable>
                    </View>

                    {/* Optional: tombol reset filter */}
                    {!!appliedSearch && (
                    <Pressable
                        onPress={() => {
                            setSearchText("");
                            setAppliedSearch("");
                            setSearchOpen(false);
                        }}
                        style={styles.searchReset}
                    >
                        <Text style={styles.searchResetText}>Reset pencarian</Text>
                    </Pressable>
                    )}
                </KeyboardAvoidingView>
            </Modal>

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
    searchBackdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.35)",
    },

    searchTopWrap: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        paddingTop: spacing.lg,      // selaras dengan AppBar wrap kamu
        paddingHorizontal: spacing.lg,
    },

    searchPill: {
        backgroundColor: colors.headerPill,
        borderRadius: 999,
        minHeight: 56,
        paddingHorizontal: spacing.lg,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },

    searchInput: {
        paddingHorizontal: spacing.md,   // atau 12 / 16
        flex: 1,
        ...typography.body,
        color: colors.text,
        paddingVertical: 12,
    },

    searchIconBtn: {
        padding: spacing.xs,
    },

    searchReset: {
        alignSelf: "center",
        marginTop: spacing.md,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: 999,
        backgroundColor: colors.surfaceGreige,
    },

    searchResetText: {
        ...typography.small,
        color: colors.text,
        fontWeight: "700",
    },


});
