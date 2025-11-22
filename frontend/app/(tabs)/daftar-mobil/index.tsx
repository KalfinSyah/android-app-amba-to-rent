import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { GreigePanel } from "@/components/Card";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

function WhitePill({ children }: any) {
    return <View style={styles.whitePill}>{children}</View>;
}

export default function RentCarScreen() {
    return (
        <View style={styles.root}>
            <AppBar title="Sewa Mobil" />

            <View style={styles.content}>
                <GreigePanel>
                    <Text style={styles.panelTitle}>Pilih Tanggal</Text>
                    <WhitePill><Text style={styles.pillText}>03/11/2025</Text></WhitePill>
                    <Text style={styles.sd}>s/d</Text>
                    <WhitePill><Text style={styles.pillText}>07/11/2025</Text></WhitePill>
                </GreigePanel>

                <GreigePanel>
                    <Text style={styles.panelTitle}>Pilih Mobil</Text>
                    <PrimaryButton
                        label="Lihat Mobil"
                        onPress={() => router.push("/daftar-mobil/car-list")}
                        iconLeft={<Text style={{ color: colors.primaryText }}>📅</Text>}
                    />
                </GreigePanel>

                <GreigePanel>
                    <Text style={styles.panelTitle}>Pilih Pembayaran</Text>
                    <WhitePill style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <Text style={styles.pillText}>Bayar di Toko</Text>
                        <Text style={{ fontSize: 18 }}>⌄</Text>
                    </WhitePill>
                </GreigePanel>

                <PrimaryButton label="Sewa" onPress={() => {}} disabled style={{ marginTop: spacing.xl }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },
    content: { padding: spacing.lg },
    panelTitle: { ...typography.h1, textAlign: "center", marginBottom: spacing.md },
    whitePill: {
        backgroundColor: colors.whitePill,
        borderRadius: 999,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: spacing.lg,
    },
    pillText: { ...typography.body, fontWeight: "700" },
    sd: { textAlign: "center", marginVertical: spacing.sm },
});
