import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Penalty } from "@/types/models";

const BASE_URL = "http://127.0.0.1:8000";

async function fetchPenaltyByOrderId(orderId: string) {
  try {
    const token = await AsyncStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/penalties/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await res.json();
    return data.data ?? [];
  } catch (err) {
    console.log("Fetch penalties error:", err);
    return [];
  }
}

export default function PenaltyDetailScreen() {
  const [penalties, setPenalties] = useState<Penalty[]>([]);
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const data = await fetchPenaltyByOrderId(orderId);
        setPenalties(data);
      };
      load();
    }, [orderId])
  );

  return (
    <View style={styles.root}>
      <AppBar title="Detail Penalti" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.container}>
        {penalties.length === 0 ? (
          <Text style={styles.emptyText}>Tidak ada data penalti.</Text>
        ) : (
          penalties.map((p) => (
            <View key={p.id} style={styles.card}>
              {/* FOTO */}
              <Image source={{ uri: p.foto_penalty }} style={styles.photo} />

              {/* JENIS */}
              <Text style={styles.penaltyType}>{p.jenis_penalty}</Text>

              {/* BIAYA */}
              <Text style={styles.cost}>
                Rp {p.biaya_penalty.toLocaleString("id-ID")}
              </Text>

              {/* STATUS */}
              <Text
                style={[
                  styles.statusBadge,
                  p.status_penalty === "Paid"
                    ? styles.statusPaid
                    : styles.statusUnpaid,
                ]}
              >
                {p.status_penalty}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  container: {
    padding: spacing.lg,
    paddingBottom: 80,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    ...typography.h3,
    color: colors.muted,
  },

  card: {
    backgroundColor: colors.surfaceGreige,
    padding: spacing.lg,
    borderRadius: 18,
    marginBottom: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
  },

  photo: {
    width: "100%",
    height: 200,
    borderRadius: 14,
    marginBottom: spacing.md,
  },

  penaltyType: {
    ...typography.h2,
    color: colors.primaryText,
    textAlign: "center",
  },

  cost: {
    ...typography.h2,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    color: colors.primaryText,
  },

  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 14,
    ...typography.small,
    color: "white",
    textAlign: "center",
  },

  statusPaid: {
    backgroundColor: "green",
  },

  statusUnpaid: {
    backgroundColor: "red",
  },
});
