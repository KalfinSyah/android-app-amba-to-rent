import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { router } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { GreigePanel } from "@/components/Card";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export default function HomeScreen() {
  return (
    <View style={styles.root}>
      { /* 🔥 Background Video dari file lokal */}
        <Video
        source={require("../../../assets/videos/homepagefootage.mp4")}
        style={StyleSheet.absoluteFillObject}
        shouldPlay
        isLooping
        resizeMode={ResizeMode.COVER}
        isMuted
        />

      {/* 🔥 Overlay konten agar tampil di atas video */}
      <View style={styles.overlay}>
        <AppBar title="AmbaToRent" />

        <View style={styles.content}>
          {/* <View style={styles.heroRow}>
            <Image source={{ uri: "https://picsum.photos/800/400" }} style={styles.heroMain} />
            <Image source={{ uri: "https://picsum.photos/200/400" }} style={styles.heroSide} />
          </View> */}

          <GreigePanel>
            <Text style={styles.ctaTitle}>Sewa Mobil Sekarang!</Text>
            <PrimaryButton
              label="Pesan"
              onPress={() => router.push("/daftar-mobil")}
              iconLeft={<Text style={{ color: colors.primaryText }}>📅</Text>}
            />
          </GreigePanel>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)", // tetep transparan, jadi video kelihatan
  },

  content: { padding: spacing.lg },
  heroRow: { flexDirection: "row", gap: spacing.sm },
  heroMain: { flex: 1, height: 190, borderRadius: 18 },
  heroSide: { width: 78, height: 190, borderRadius: 18 },
  ctaTitle: {
    ...typography.h2,
    textAlign: "center",
    marginBottom: spacing.md,
  },
});
