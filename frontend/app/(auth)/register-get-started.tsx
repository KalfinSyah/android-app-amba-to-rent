import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { router } from "expo-router";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { spacing } from "@/theme/spacing";

export default function RegisterGetStartedScreen() {
    return (
        <View style={styles.root}>
            <ImageBackground
                source={require("../../assets/images/mazda-cx70-page.jpg")}
                style={styles.bg}
                resizeMode="cover"
            >
            {/* subtle dark overlay so white text pops */}
                <View style={styles.overlay}>
                    {/* Brand near top-middle like screenshot */}
                    <View style={styles.logoBlock}>
                        <Image
                        style={styles.logoIcon}
                        source={require("../../assets/images/ambatorent-short-light.png")}
                        resizeMode="contain"
                        />
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
                        onPress={() => router.push("/login")}
                        // biarkan button stretch mengikuti parent, tanpa width: "100%"
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },

    bg: {
        flex: 1,
        width: "100%",
        height: "100%",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.20)",
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
        paddingBottom: spacing.lg,
        justifyContent: "flex-start",   // ⬅️ bukan lagi space-between
    },

    logoBlock: {
        alignItems: "center",
        marginTop: spacing.sm,
    },

    logoIcon: {
        width: "60%",
        maxWidth: 260,
        aspectRatio: 460 / 240,
        tintColor: "#FFFFFF",
    },

    headline: {
        ...typography.h1,
        color: "#FFFFFF",
        lineHeight: 34,
        marginTop: spacing.lg,  // jarak normal di bawah logo
        alignSelf: "flex-start",
        flexShrink: 1,
    },

    ctaWrap: {
        width: "100%",
        marginTop: "auto",      // ⬅️ dorong tombol ke bawah layar
        paddingBottom: spacing.sm,
    },
});

