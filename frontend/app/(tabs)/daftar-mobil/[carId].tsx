import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { cars } from "@/data/mock";

function Chip({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.chip}>
            <Text style={styles.chipLabel}>{label}</Text>
            <Text style={styles.chipValue}>{value}</Text>
        </View>
    );
}

export default function CarDetailScreen() {
    const { carId } = useLocalSearchParams<{ carId: string }>();
    const car = cars.find((c) => c.id === carId) ?? cars[0];

    return (
        <View style={styles.root}>
        {/* back icon shows over image in Figma, but your AppBar is pill. We'll keep pill + back */}
        <AppBar title="" onBack={() => router.back()} rightIcon="bell-o" />

        <ScrollView>
            <Image source={{ uri: car.image }} style={styles.hero} />

            {/* White sheet */}
            <View style={styles.sheet}>
            <Text style={styles.titleCenter}>
                {car.year} {car.brand} {car.name}
            </Text>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Informasi Mobil</Text>

            <View style={styles.chipGridRow}>
                <Chip label="Merk" value={car.brand} />
                <Chip label="Tahun" value={String(car.year)} />
            </View>

            <View style={styles.chipWide}>
                <Text style={styles.chipLabel}>Nama</Text>
                <Text style={styles.chipValue}>{car.name}</Text>
            </View>

            <View style={styles.chipGridRow}>
                <Chip label="Jenis" value={car.type} />
                <Chip label="Tipe Mesin" value={car.fuel} />
                <Chip label="Transisi" value={car.transmission} />
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Informasi Sewa</Text>

            <View style={styles.chipWide}>
                <Text style={styles.chipLabel}>Status</Text>
                <Text style={styles.chipValue}>
                {car.available ? "Tersedia" : "Tidak tersedia"}
                </Text>
            </View>

            <View style={styles.chipWide}>
                <Text style={styles.chipLabel}>Harga</Text>
                <Text style={styles.chipValue}>
                IDR{car.pricePerDay.toLocaleString("id-ID")} utk 4 hari
                </Text>
            </View>

            <PrimaryButton
                label="Pesan"
                onPress={() => router.push("/pesanan")}
                iconLeft={<Text style={{ color: colors.primaryText }}>📅</Text>}
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
