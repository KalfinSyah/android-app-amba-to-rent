import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { TextField } from "@/components/TextField";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

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

                <View style={{ height: spacing.xl }} />

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
                    onPress={() => router.replace("/beranda")}
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
