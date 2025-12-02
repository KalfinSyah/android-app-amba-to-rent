import React, { useEffect } from "react";
import { View, StyleSheet, ImageBackground, Image } from "react-native";
import { router } from "expo-router";
import { spacing } from "@/theme/spacing";

export default function RegisterLandingScreen() {
    useEffect(() => {
        const t = setTimeout(() => {
            router.replace("/register-get-started");
            }, 1200);
        return () => clearTimeout(t);
    }, []);

    return (
        <View style={styles.root}>
            <ImageBackground
                source={require("../../assets/images/mazda-cx70-page.jpg")}
                style={styles.bg}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <View style={styles.logoBlock}>
                        <Image
                        style={styles.logoIcon}
                        source={require("../../assets/images/ambatorent-short-light.png")}
                        resizeMode="contain"
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
        backgroundColor: "rgba(0,0,0,0.50)",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing.lg,
    },

    /* LOGO BLOCK — kini responsif */
    logoBlock: {
        width: "180%",
        maxWidth: 420,
        aspectRatio: 460/240,
        alignItems: "center",
        justifyContent: "center",
    },

    logoIcon: {
        width: "100%",
        height: "100%",
        tintColor: "#FFFFFF",
    },
});
