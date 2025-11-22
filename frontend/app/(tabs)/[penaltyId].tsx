import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { penalties } from "@/data/mock";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
}

export default function PenaltyDetailScreen() {
    const { penaltyId } = useLocalSearchParams<{ penaltyId: string }>();
    const p = penalties.find((x) => x.id === penaltyId) ?? penalties[0];

    return (
        <View style={styles.root}>
            <AppBar title="Detail Penalti" onBack={() => router.back()} />

            <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
                <Text style={styles.sectionTitle}>Foto Penalti</Text>
                <Image source={{ uri: p.photo }} style={styles.photo} />

                <Text style={styles.sectionTitle}>Informasi Penalti</Text>

                <View style={styles.panel}>
                    <InfoRow label="Jenis Penalti" value={p.type} />
                    <InfoRow label="Status Penalti" value={p.status} />
                </View>

                <View style={styles.panel}>
                    <InfoRow label="Biaya" value={`Rp. ${p.cost.toLocaleString("id-ID")}`} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },
    sectionTitle: { ...typography.h2, textAlign: "center", marginVertical: spacing.md },
    photo: { width: "100%", height: 210, borderRadius: 14, marginBottom: spacing.lg },

    panel: {
        backgroundColor: colors.surfaceGreige,
        borderRadius: 18,
        padding: spacing.lg,
        marginBottom: spacing.lg,
    },

    infoRow: { alignItems: "center" },
    infoLabel: { ...typography.small },
    infoValue: { ...typography.h3, marginTop: 2 },
});
