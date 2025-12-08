import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AppBar } from "@/components/AppBar";
import { TextField } from "@/components/TextField";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchUser = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        const user_id = await AsyncStorage.getItem("user_id")

        if (!token) return null;

        const res = await fetch(`http://127.0.0.1:8000/api/users/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        });

        const data = await res.json();
        return data.user;

    } catch (err) {
        console.log("Fetch user error:", err);
        return null;
    }
};

export default function ProfileScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        const loadUser = async () => {
            const user = await fetchUser();
            if (user) {
                setName(user.nama_user);
                setEmail(user.email_user);
                setPhone(user.no_telp_user);
            }
        };
        loadUser();
    }, []);

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

                <Text style={styles.name}>{name}</Text>

                <View style={{ height: spacing.xl }} />
                    <TextField label="Email" value={email} onChangeText={setEmail} />
                    <TextField label="No. Telp" value={phone} onChangeText={setPhone} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },
    container: { padding: spacing.xl, alignItems: "center" },

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
