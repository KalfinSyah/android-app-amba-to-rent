import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { AppBar } from "@/components/AppBar";
import { CarCard } from "@/components/Card";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { Car } from "@/types/models";

const BASE_URL = "http://127.0.0.1:8000";

async function fetchAllCars(search?: string): Promise<Car[] | null> {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return null;

    // Jika backend Anda belum support query search via GET,
    // Anda bisa tetap GET all lalu filter di frontend.
    // Di sini kita coba support query param ?search=
    const qs = search && search.trim().length > 0 ? `?search=${encodeURIComponent(search.trim())}` : "";

    const res = await fetch(`${BASE_URL}/api/cars${qs}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await res.json();

    // Sesuaikan jika struktur response berbeda
    return data.cars ?? [];
  } catch (err) {
    console.log("Fetch all cars error:", err);
    return null;
  }
}

function StatusBadge({ available }: { available: boolean }) {
  return (
    <View style={[styles.badge, available ? styles.badgeAvailable : styles.badgeUnavailable]}>
      <Text style={styles.badgeText}>{available ? "Available" : "Unavailable"}</Text>
    </View>
  );
}

export default function KatalogScreen() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      setLoading(true);
      const result = await fetchAllCars(appliedSearch);

      if (!mounted) return;
      setCars(result ?? []);
      setLoading(false);
    };

    run();
    return () => {
      mounted = false;
    };
  }, [appliedSearch]);

  if (loading) {
    return (
      <View style={styles.root}>
        <AppBar title="Katalog Mobil" onBack={() => router.back()} />
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color={colors.text} />
          <Text style={styles.loadingText}>Memuat katalog mobil...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <AppBar
        title="Katalog Mobil"
        rightIcon="search"
        onRightPress={() => setSearchOpen(true)}
        onBack={() => router.back()}
      />

      {/* Search Overlay */}
      <Modal
        visible={searchOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setSearchOpen(false)}
      >
        <Pressable style={styles.searchBackdrop} onPress={() => setSearchOpen(false)} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.searchTopWrap}
        >
          <View style={styles.searchPill}>
            <FontAwesome name="search" size={18} color={colors.text} />

            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Cari merk atau nama mobil..."
              placeholderTextColor={colors.muted}
              style={styles.searchInput}
              autoFocus
              returnKeyType="search"
              onSubmitEditing={() => {
                setAppliedSearch(searchText);
                setSearchOpen(false);
              }}
            />

            {!!searchText && (
              <Pressable onPress={() => setSearchText("")} style={styles.searchIconBtn}>
                <FontAwesome name="times" size={18} color={colors.text} />
              </Pressable>
            )}

            <Pressable
              onPress={() => {
                setAppliedSearch(searchText);
                setSearchOpen(false);
              }}
              style={styles.searchIconBtn}
            >
              <FontAwesome name="check" size={18} color={colors.text} />
            </Pressable>
          </View>

          {!!appliedSearch && (
            <Pressable
              onPress={() => {
                setSearchText("");
                setAppliedSearch("");
                setSearchOpen(false);
              }}
              style={styles.searchReset}
            >
              <Text style={styles.searchResetText}>Reset pencarian</Text>
            </Pressable>
          )}
        </KeyboardAvoidingView>
      </Modal>

      {/* List */}
      <FlatList
        data={cars}
        keyExtractor={(c) => c.id.toString()}
        contentContainerStyle={{ padding: spacing.lg }}
        ListEmptyComponent={
          <View style={{ paddingTop: spacing.xl }}>
            <Text style={{ ...typography.body, textAlign: "center", color: colors.muted }}>
              Tidak ada mobil ditemukan.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              router.push({
                pathname: "/katalog/[catalogueId]",
                params: {
                  catalogueId: item.id.toString(),
                  // Karena katalog tidak pakai booking, kita tidak kirim start/end.
                  // Halaman detail Anda sudah handle start/end opsional.
                },
              })
            }
          >
            <CarCard image={item.foto_mobil}>
              {/* badge status */}
              <View style={styles.badgeWrap}>
                <StatusBadge available={!!item.status_mobil} />
              </View>

              <Text style={styles.carName}>{item.nama_mobil}</Text>
              <Text style={styles.year}>{item.tahun_mobil}</Text>
              <Text style={styles.specs}>
                Tipe: {item.jenis_mobil} | Transmisi: {item.tipe_transmisi} | Mesin: {item.tipe_mesin}
              </Text>

              <View style={styles.pricePill}>
                <Text style={styles.priceText}>
                  IDR {item.harga_sewa.toLocaleString("id-ID")} / hari
                </Text>
              </View>
            </CarCard>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  carName: { ...typography.h1 },
  year: { ...typography.body, marginTop: 2, marginBottom: spacing.sm },
  specs: { ...typography.small, color: colors.text },

  pricePill: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginTop: spacing.md,
  },
  priceText: { ...typography.small, color: colors.primaryText, fontWeight: "700" },

  // Loading
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  loadingText: {
    ...typography.loading,
    marginTop: spacing.md,
    color: colors.muted,
  },

  // Badge
  badgeWrap: {
    position: "absolute",
    right: spacing.md,
    top: spacing.md,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeAvailable: {
    backgroundColor: "#1B5E20", // hijau gelap
  },
  badgeUnavailable: {
    backgroundColor: "#B71C1C", // merah gelap
  },
  badgeText: {
    ...typography.small,
    color: "#fff",
    fontWeight: "800",
  },

  // Search modal (sama seperti car-list)
  searchBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  searchTopWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  searchPill: {
    backgroundColor: colors.headerPill,
    borderRadius: 999,
    minHeight: 56,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    paddingVertical: 12,
    paddingHorizontal: spacing.md, // geser placeholder & teks input
  },
  searchIconBtn: {
    padding: spacing.xs,
  },
  searchReset: {
    alignSelf: "center",
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.surfaceGreige,
  },
  searchResetText: {
    ...typography.small,
    color: colors.text,
    fontWeight: "700",
  },
});
