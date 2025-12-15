import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !pass) return;

        setErrorMsg(null);
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                },
                body: JSON.stringify({
                email_user: email,
                password: pass,
            }),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            // Backend kadang kirim {message} atau {errors:{...}}
            const msg =
                data?.message ||
                (data?.errors
                    ? Object.values(data.errors).flat().join("\n")
                    : null) ||
                "Login gagal";

            setErrorMsg(msg);
            return;
        }

        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user_id", String(data.user.id));

        router.replace("/(tabs)/beranda"); // lebih aman untuk flow login
        } catch (err) {
            setErrorMsg("Terjadi kesalahan server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.root}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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

                    {!!errorMsg && (
                        <Text style={styles.errorText}>{errorMsg}</Text>
                    )}

                    <View style={{ height: spacing.xxl }} />

                    <PrimaryButton
                        label={loading ? "Memproses..." : "Login"}
                        onPress={handleLogin}
                        style={{ width: "100%" }}
                        disabled={!email || !pass || loading}
                    />

                    <View style={{ height: spacing.sm }} />

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
        marginTop: spacing.lg,
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
    errorText: {
        ...typography.small,
        color: "#B00020",
        fontWeight: "700",
        textAlign: "center",
    },
});
