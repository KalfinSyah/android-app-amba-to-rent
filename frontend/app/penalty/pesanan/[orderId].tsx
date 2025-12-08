import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { penalties } from "@/data/mock";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Penalties {
  id: number;
  order_id: number;
  jenis_penalty: string;
  biaya_penalty: number;
  foto_penalty: string;
  status_penalty: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}


function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
}

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
    console.log(data.data);
    return data.data; // correct field
  } catch (err) {
    console.log("Fetch order by id error:", err);
    return null;
  }
}


export default function PenaltyDetailScreen() {
    const [penalties, setPenalties] = useState<Penalties[]>([]);
    const { orderId } = useLocalSearchParams<{ orderId: string }>();
   
    useFocusEffect(
    useCallback(() => {
        const load = async () => {
        const data = await fetchPenaltyByOrderId(orderId);
            if (data) {
                setPenalties(data);
            }
        };
        load();
    }, [orderId])
    );
    return (
        <View style={styles.root}>
            <AppBar title="Detail Penalti" onBack={() => router.back()} />

            <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
                <Text>{JSON.stringify(penalties, null, 2)}</Text>
                {/* <Text style={styles.sectionTitle}>Foto Penalti</Text>
                <Image source={{ uri: p.photo }} style={styles.photo} />

                <Text style={styles.sectionTitle}>Informasi Penalti</Text>

                <View style={styles.panel}>
                    <InfoRow label="Jenis Penalti" value={p.type} />
                    <InfoRow label="Status Penalti" value={p.status} />
                </View>

                <View style={styles.panel}>
                    <InfoRow label="Biaya" value={`Rp. ${p.cost.toLocaleString("id-ID")}`} />
                </View> */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },
    sectionTitle: { ...typography.h2, textAlign: "center", marginVertical: spacing.md },
    photo: { width: "100%", height: 210, borderRadius: 14, marginBottom: spacing.lg },

    panel: {
        backgroundColor: colors.surfaceGreige,
        borderRadius: 18,
        padding: spacing.lg,
        marginBottom: spacing.lg,
    },

    infoRow: { alignItems: "center" },
    infoLabel: { ...typography.small },
    infoValue: { ...typography.h3, marginTop: 2 },
});
