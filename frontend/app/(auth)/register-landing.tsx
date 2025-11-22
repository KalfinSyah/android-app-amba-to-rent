import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { router } from "expo-router";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { spacing } from "@/theme/spacing";

export default function RegisterLandingScreen() {
    useEffect(() => {
        const t = setTimeout(() => {
        router.replace("/register-get-started");
        }, 1200);
        return () => clearTimeout(t);
    }, []);

    return (
        <ImageBackground
            source={require("../../assets/images/mazda-cx70-page.jpg") }
            style={styles.bg}
            resizeMode="cover"
            >
            <View style={styles.overlay}>
                {/* simple “logo” block like your screenshot */}
                <View style={styles.logoBlock}>
                    <Image style={styles.logoIcon} source={require("../../assets/images/ambatorent-short-light.png")} resizeMode="contain"/>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1 },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.50)",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing.xl,
    },
    logoBlock: {
        width: 460,
        height: 240,
        borderRadius: 45,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.lg,
    },
    logoIcon: { width: 460, height: 240, tintColor: "#FFFFFF" },

    brand: {
        color: "#FFFFFF",
        fontWeight: "800",
        letterSpacing: 4,
        fontSize: 22,
        marginBottom: 6,
    },
    tagline: {
        color: "#FFFFFF",
        letterSpacing: 1,
        fontSize: 13,
        opacity: 0.95,
    },
});
