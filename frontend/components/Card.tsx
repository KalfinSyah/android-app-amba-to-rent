import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export function GreigePanel({ children, style }: any) {
    return <View style={[styles.greigePanel, style]}>{children}</View>;
}

export function CarCard({
    image,
    children,
}: {
    image: string;
    children: React.ReactNode;
}) {
    return (
        <View style={styles.carCard}>
            <Image source={{ uri: image }} style={styles.carImage} />
            <View style={styles.carInfo}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    greigePanel: {
        backgroundColor: colors.surfaceGreige,
        borderRadius: 24,
        padding: spacing.lg,
        marginBottom: spacing.lg,
    },
    carCard: {
        borderRadius: 18,
        overflow: "hidden",
        marginBottom: spacing.lg,
        backgroundColor: colors.surfaceGreige,
    },
    carImage: {
        width: "100%",
        height: 210,
    },
    carInfo: {
        padding: spacing.lg,
        backgroundColor: colors.surfaceGreige,
    },
});
