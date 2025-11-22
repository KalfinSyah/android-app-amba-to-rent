import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export function TextField({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    helper,
}: {
    label?: string;
    value: string;
    onChangeText: (t: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    helper?: string;
}) {
    return (
        <View style={{ marginBottom: spacing.lg }}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                style={styles.input}
                placeholderTextColor={colors.muted}
            />
            {!!helper && <Text style={styles.helper}>{helper}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        ...typography.small,
        color: colors.text,
        marginBottom: spacing.xs,
        marginLeft: spacing.sm,
    },
    input: {
        height: 56,
        borderWidth: 1.4,
        borderColor: colors.outline,
        borderRadius: 16,
        paddingHorizontal: spacing.lg,
        color: colors.text,
        backgroundColor: colors.bg,
    },
    helper: {
        ...typography.small,
        color: colors.text,
        marginTop: spacing.xs,
        marginLeft: spacing.sm,
    },
});
