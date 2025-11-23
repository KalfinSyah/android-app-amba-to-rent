import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { TextField } from "@/components/TextField";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

const handleLogin = async (email: String, pass: String) => {
    if (!email || !pass) return;

    try {
        const response = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email_user: email,
                password: pass
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Login gagal");
            return;
        }

        // Simpan token ke storage
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user_id", String(data.user.id));

        console.log("id ", data.user.id)

        // Berhasil login → navigate
        router.push("/beranda");

    } catch (err) {
        // console.log(err);
        alert("Terjadi kesalahan server");
    }
};

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
                    onPress={() => handleLogin(email, pass)}
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
