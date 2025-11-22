import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

export function PrimaryButton({
    label,
    onPress,
    disabled,
    style,
    iconLeft,
}: {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    style?: ViewStyle;
    iconLeft?: React.ReactNode;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.btn,
                disabled && styles.disabled,
                style,
            ]}
            >
            {iconLeft}
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        height: 56,
        backgroundColor: colors.primary,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 20,
    },
    text: { ...typography.h3, color: colors.primaryText },
    disabled: {
        backgroundColor: "#E6E6E6",
    },
});
