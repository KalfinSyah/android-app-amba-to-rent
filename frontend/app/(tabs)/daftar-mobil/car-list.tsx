import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { router } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { CarCard } from "@/components/Card";
import { cars } from "@/data/mock";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { TouchableOpacity } from "react-native";

export default function CarListScreen() {
    return (
        <View style={styles.root}>
            <AppBar title="Daftar Mobil" rightIcon="search" onBack={() => router.back()} />

            <FlatList
                data={cars}
                keyExtractor={(c) => c.id}
                contentContainerStyle={{ padding: spacing.lg }}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => router.push(`/daftar-mobil/${item.id}`)}>
                    <CarCard image={item.image!}>
                        <Text style={styles.carName}>{item.name}</Text>
                        <Text style={styles.year}>{item.year}</Text>
                        <Text style={styles.specs}>
                            Tipe: {item.type} | Transmisi: {item.transmission} | Mesin: {item.fuel}
                        </Text>

                        <View style={styles.pricePill}>
                            <Text style={styles.priceText}>
                            IDR{item.pricePerDay.toLocaleString("id-ID")} utk 4 hari.
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
});
