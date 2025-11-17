import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { router, Stack } from "expo-router";

export default function RegisterScreen({ navigation }:any) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            >
                <Stack.Screen options={{ headerShown: false }} />
            {/* Title */}
            <Text style={styles.title}>Register</Text>

            {/* Name */}
            <Text style={styles.label}>Nama</Text>
            <TextInput
                style={styles.input}
                placeholder="Example: Alex"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
            />

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            {/* Phone */}
            <Text style={styles.label}>No. Telp</Text>
            <TextInput
                style={styles.input}
                placeholder="No. Telp"
                placeholderTextColor="#999"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {/* Confirm Password */}
            <Text style={styles.label}>Konfirmasi Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Konfirmasi Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Text style={styles.helperText}>Password harus cocok.</Text>

            {/* BOTTOM SECTION */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <Text style={styles.footerText}>
                    Sudah punya akun?{" "}
                    <Text style={styles.loginLink} onPress={() => router.push("/login")}>
                        Login
                    </Text>
                </Text>
            </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        paddingTop: 60,
        backgroundColor: "#fff",
    },
    scroll: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 200, // makes room for the bottom bar so content isn't hidden
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 40,
        alignSelf: "center",
    },
    label: {
        fontSize: 12,
        color: "#333",
        marginBottom: 6,
        marginLeft: 4,
    },
    input: {
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        marginBottom: 20,
        fontSize: 14,
    },
    helperText: {
        fontSize: 12,
        color: "#555",
        marginTop: -15,
        marginBottom: 20,
        marginLeft: 4,
    },
    bottomContainer: {
        position: "absolute",
        bottom: 30,
        left: 20,
        right: 20,
        alignItems: "center",
    },

    button: {
        backgroundColor: "#4A1F0F",
        paddingVertical: 18,
        borderRadius: 12,
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    footerText: {
        fontSize: 12,
        textAlign: "center",
    },

    loginLink: {
        fontWeight: "bold",
    },
});
