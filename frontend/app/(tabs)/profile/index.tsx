import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AppBar } from "@/components/AppBar";
import { TextField } from "@/components/TextField";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export default function ProfileScreen() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    return (
        <View style={styles.root}>
            <AppBar title="Profile" />

            <View style={styles.container}>
                <View style={styles.avatarWrap}>
                    <Image source={{ uri: "https://picsum.photos/200" }} style={styles.avatar} />
                    <TouchableOpacity style={styles.editBadge}>
                            <Text style={{ color: "white", fontWeight: "800" }}>✎</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.name}>Bagus Wibowo</Text>

                <View style={{ height: spacing.xl }} />
                    <TextField label="Email" value={email} onChangeText={setEmail} />
                    <TextField label="No. Telp" value={phone} onChangeText={setPhone} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },
    container: { padding: spacing.lg, alignItems: "center" },

    avatarWrap: { marginTop: spacing.xl, marginBottom: spacing.md },
    avatar: { width: 120, height: 120, borderRadius: 60 },
    editBadge: {
        position: "absolute",
        right: -4,
        bottom: 6,
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#7E57C2", // purple accent like Figma
        alignItems: "center",
        justifyContent: "center",
    },

    name: { ...typography.h1, marginTop: spacing.sm },
});
