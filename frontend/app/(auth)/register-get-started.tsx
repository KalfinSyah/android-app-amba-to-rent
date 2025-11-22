import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { router } from "expo-router";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { spacing } from "@/theme/spacing";

export default function RegisterGetStartedScreen() {
    return (
        <ImageBackground
        source={require("../../assets/images/mazda-cx70-page.jpg")}
        style={styles.bg}
        resizeMode="cover"
        >
        {/* subtle dark overlay so white text pops */}
            <View style={styles.overlay}>
                {/* Brand near top-middle like screenshot */}
                <View style={styles.logoBlock}>
                    <Image style={styles.logoIcon} source={require("../../assets/images/ambatorent-short-light.png")} resizeMode="contain"/>
                </View>

                {/* Big multiline headline */}
                <Text style={styles.headline}>
                    Selamat Datang di{"\n"}
                    Platform untuk Rental{"\n"}
                    Mobil Online{"\n"}
                    terpercaya.
                </Text>

                {/* Bottom CTA */}
                <View style={styles.ctaWrap}>
                <PrimaryButton
                    label="Get Started"
                    onPress={() => router.push("/register-form")}
                    style={{ width: "100%" }}
                />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: { flex: 1 },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.20)",
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xxl,
        paddingBottom: spacing.xxl,
        justifyContent: "space-between",
    },

    logoBlock: {
        alignItems: "center",
        marginTop: spacing.lg,
    },
    logoIcon: { width: 460, height: 240, tintColor: "#FFFFFF" },
    brand: {
        color: "#FFFFFF",
        fontWeight: "800",
        letterSpacing: 4,
        fontSize: 22,
    },
    tagline: {
        color: "#FFFFFF",
        fontSize: 12,
        marginTop: 4,
        letterSpacing: 1,
    },

    headline: {
        ...typography.h1,
        color: "#FFFFFF",
        alignSelf: "flex-start",
        lineHeight: 34,
        marginTop: spacing.xl,
    },

    ctaWrap: {
        width: "100%",
        paddingBottom: spacing.lg,
    },
});
