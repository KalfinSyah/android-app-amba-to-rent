import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { TextField } from "@/components/TextField";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    return (
        <View style={styles.root}>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                {/* Big centered title like Figma */}
                <Text style={styles.title}>Login</Text>

                <View style={{ height: spacing.xxl }} />

                <TextField
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Example: Alex@hotmail.com"
                />

                <TextField
                    label="Password"
                    value={pass}
                    onChangeText={setPass}
                    secureTextEntry
                />

                <View style={{ height: spacing.xxl }} />

                {/* Big brown pill button at bottom */}
                <PrimaryButton
                    label="Login"
                    onPress={() => router.replace("/beranda")}
                    style={{ width: "100%" }}
                    disabled={!email || !pass}
                />

                <View style={{ height: spacing.sm }} />

                {/* Inline link like Figma */}
                <View style={styles.linkRow}>
                    <Text style={styles.linkText}>Belum punya akun? </Text>
                    <Pressable onPress={() => router.push("/register-form")}>
                        <Text style={styles.linkBold}>Register</Text>
                    </Pressable>
                </View>

                <View style={{ height: spacing.xl }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },

    container: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xxl,
        paddingBottom: spacing.xxl,
    },

    title: {
        ...typography.screenTitle,
        textAlign: "center",
        color: colors.text,
    },

    linkRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    linkText: { ...typography.small, color: colors.text },
    linkBold: {
        ...typography.small,
        color: colors.text,
        fontWeight: "800",
    },
});
