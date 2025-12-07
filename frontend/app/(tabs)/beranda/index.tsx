import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { GreigePanel } from "@/components/Card";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { Text } from "react-native";

export default function HomeScreen() {
    return (
        <View style={styles.root}>
        <AppBar title="AmbaToRent" />

        <View style={styles.content}>
            {/* Carousel-like hero (2 images) */}
            <View style={styles.heroRow}>
            <Image source={{ uri: "https://picsum.photos/800/400" }} style={styles.heroMain} />
            <Image source={{ uri: "https://picsum.photos/200/400" }} style={styles.heroSide} />
            </View>

            <GreigePanel>
            <Text style={styles.ctaTitle}>Sewa Mobil Sekarang!</Text>
            <PrimaryButton
                label="Pesan"
                onPress={() => router.push("/daftar-mobil")}
                iconLeft={<Text style={{ color: colors.primaryText }}>📅</Text>}
            />
            </GreigePanel>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },
    content: { padding: spacing.lg },
    heroRow: { flexDirection: "row", gap: spacing.sm },
    heroMain: { flex: 1, height: 190, borderRadius: 18 },
    heroSide: { width: 78, height: 190, borderRadius: 18 },
    ctaTitle: {
        ...typography.h2,
        textAlign: "center",
        marginBottom: spacing.md,
    },
});
