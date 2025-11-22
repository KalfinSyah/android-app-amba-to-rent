import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { PrimaryButton } from "@/components/PrimaryButton";
import { orders, cars } from "@/data/mock";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

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
    const order = orders.find((o) => o.id === orderId) ?? orders[0];
    const car = cars.find((c) => c.id === order.carId) ?? cars[0];

    return (
        <View style={styles.root}>
            <AppBar title={`${order.id}`} onBack={() => router.back()} />

            <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
                <Text style={styles.sectionTitle}>Mobil yang Disewa</Text>

                {/* Stacked card */}
                <View style={styles.stackedCard}>
                    <Image source={{ uri: car.image }} style={styles.cardImage} />
                    <View style={styles.cardInfo}>
                        <Text style={styles.carName}>{car.brand} {car.name}</Text>
                        <Text style={styles.carYear}>{car.year}</Text>
                        <Text style={styles.specs}>
                        Tipe: {car.type} | Transmisi: {car.transmission} | Mesin: {car.fuel} |
                        {"\n"}Penumpang: 7 Orang
                        </Text>
                    </View>
                </View>

                <PrimaryButton
                    label="Penalti"
                    onPress={() => router.push("/orders/penalties")}
                    iconLeft={<Text style={{ color: colors.primaryText }}>⚠️</Text>}
                    style={{ marginBottom: spacing.xl }}
                />

                <Text style={styles.sectionTitle}>Informasi Pesanan</Text>

                <View style={styles.row}>
                    <InfoChip label="Tanggal Order" value={order.orderDate} />
                    <InfoChip label="Total Harga" value={`Rp. ${order.totalPrice.toLocaleString("id-ID")}`} />
                </View>

                <View style={styles.infoWide}>
                    <Text style={styles.infoLabel}>Status</Text>
                    <Text style={styles.statusValue}>{order.status}</Text>
                </View>

                <View style={styles.row}>
                    <InfoChip label="Tanggal Sewa" value={order.startDate} />
                        <Text style={styles.dash}>-</Text>
                    <InfoChip label="Tanggal Kembali" value={order.endDate} />
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
    cardInfo: { padding: spacing.lg, backgroundColor: colors.surfaceGreige },
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
