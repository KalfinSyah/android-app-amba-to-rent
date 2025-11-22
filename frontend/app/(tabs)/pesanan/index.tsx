import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { orders, cars } from "@/data/mock";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export default function OrdersScreen() {
    return (
        <View style={styles.root}>
            <AppBar title="Pesanan" />

            <FlatList
                data={orders}
                keyExtractor={(o) => o.id}
                contentContainerStyle={{ padding: spacing.lg }}
                renderItem={({ item }) => {
                const car = cars.find((c) => c.id === item.carId);
                return (
                    <TouchableOpacity onPress={() => router.push(`/pesanan/${item.id}`)}>
                    <View style={styles.orderCard}>
                        <View style={{ flex: 1 }}>
                        <Text style={styles.orderTitle}>
                            {car?.year} {car?.brand} {car?.name}
                        </Text>
                        <Text style={styles.orderDates}>
                            {item.startDate} - {item.endDate}
                        </Text>
                        </View>
                        <Image source={{ uri: car?.image }} style={styles.thumb} />
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
        backgroundColor: "#EFE8F2", // slightly lavender-white like screenshot
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
