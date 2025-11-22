import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { penalties } from "@/data/mock";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export default function PenaltyListScreen() {
    return (
        <View style={styles.root}>
            <AppBar title="MCX70-001-1125 - Penalti" onBack={() => router.back()} />

            <FlatList
                data={penalties}
                keyExtractor={(p) => p.id}
                contentContainerStyle={{ padding: spacing.lg }}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => router.push(`/pesanan/${item.id}`)}>
                    <View style={styles.penaltyCard}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.penaltyTitle}>{item.type}</Text>
                        <Text style={styles.penaltyStatus}>{item.status}</Text>
                    </View>

                    {/* right placeholder panel like Figma */}
                    <View style={styles.previewBox} />
                    </View>
                </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },

    penaltyCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EFE8F2",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#D6CFDA",
        overflow: "hidden",
        marginBottom: spacing.lg,
    },

    penaltyTitle: { ...typography.h3, padding: spacing.md },
    penaltyStatus: { ...typography.small, paddingHorizontal: spacing.md, paddingBottom: spacing.md },

    previewBox: {
        width: 90,
        height: 70,
        backgroundColor: "#E1D9E5",
    },
});
