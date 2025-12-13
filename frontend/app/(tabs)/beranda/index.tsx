import React from "react";
import { View, StyleSheet, Image, Text, ImageBackground } from "react-native";
import { router } from "expo-router";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export default function HomeScreen() {
    return (
        <View style={styles.root}>
            <ImageBackground
                source={require("../../../assets/images/homepagebg.jpg")}
                style={styles.bg}
                resizeMode="cover"
            >
                <View style={styles.overlay}>        
                    <View style={styles.logoBlock}>
                        <Image
                        style={styles.logoIcon}
                        source={require("../../../assets/images/ambatorent-short-light.png")}
                        resizeMode="contain"
                        />
                    </View>

                    {/* Big multiline headline */}
                    <Text style={styles.headline}>
                        Perjalanan Nyaman Dimulai dari Mobil yang Tepat.
                    </Text>
                    <View style={styles.content}>
                        <PrimaryButton
                        label="Pesan Sekarang"
                        onPress={() => router.push("/booking")}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },

    bg: {
        flex: 1,
        width: "100%",
        height: "100%",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.50)",
    },
    
    content: { 
        flex: 1,
        justifyContent: "flex-end",
        padding: spacing.lg,
        marginBottom: 40
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
        alignSelf: "center",
        flexShrink: 1,
        marginLeft: spacing.xl,
    },
    
    heroRow: { flexDirection: "row", gap: spacing.sm },
    heroMain: { flex: 1, height: 190, borderRadius: 18 },
    heroSide: { width: 78, height: 190, borderRadius: 18 },
    ctaTitle: {
        ...typography.h2,
        textAlign: "center",
        marginTop: spacing.md,
    },
});
