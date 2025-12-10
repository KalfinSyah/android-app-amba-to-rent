import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { TextField } from "@/components/TextField";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleRegister = async (name: string, email: string, phone: string, pass: string) => {
    try {
        const response = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nama_user: name,
                email_user: email,
                no_telp_user: phone,
                password: pass,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Register gagal");
            return;
        }

        // Save token to device
        await AsyncStorage.setItem("token", data.token);

        // Optional: Save user data if needed later
        await AsyncStorage.setItem("user_id", String(data.user.id));

        alert("Register berhasil!");

        // Redirect to beranda
        router.replace("/beranda");

    } catch (error) {
        console.error("Register error:", error);
        alert("Terjadi kesalahan jaringan");
    }
};


export default function RegisterFormScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");

    const passMismatch = confirm.length > 0 && pass !== confirm;

    return (
        <View style={styles.root}>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                {/* Big centered title like Figma */}
                <Text style={styles.title}>Register</Text>

                <View style={{ height: spacing.xxl }} />

                <TextField
                    label="Nama"
                    value={name}
                    onChangeText={setName}
                    placeholder="Example: Alex"
                />
                <TextField
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder=""
                />
                <TextField
                    label="No. Telp"
                    value={phone}
                    onChangeText={setPhone}
                    placeholder=""
                />
                <TextField
                    label="Password"
                    value={pass}
                    onChangeText={setPass}
                    secureTextEntry
                />
                <TextField
                    label="Konfirmasi Password"
                    value={confirm}
                    onChangeText={setConfirm}
                    secureTextEntry
                    helper={passMismatch ? "Password harus cocok." : ""}
                />

                {/* Push CTA toward bottom but keep scroll-safe */}
                <View style={{ height: spacing.xxl }} />

                <PrimaryButton
                    label="Register"
                    onPress={() => handleRegister(name, email, phone, pass)}
                    style={{ width: "100%" }}
                    disabled={!name || !email || !phone || !pass || passMismatch}
                />

                <View style={{ height: spacing.sm }} />

                {/* Inline link exactly like Figma */}
                <View style={styles.linkRow}>
                    <Text style={styles.linkText}>Sudah punya akun? </Text>
                    <Pressable onPress={() => router.push("/login")}>
                        <Text style={styles.linkBold}>Login</Text>
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
    ...typography.screenTitle,   // ~40px bold
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
