import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { AppBar } from "@/components/AppBar";
import { GreigePanel } from "@/components/Card";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";


function WhitePill({ children, onPress }: any) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ width: "100%" }}>
            <View style={styles.whitePill}>{children}</View>
        </TouchableOpacity>
    );
}

export default function RentCarScreen() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const [activePicker, setActivePicker] = useState<"start" | "end" | null>(null);
    const today = new Date();
    today.setHours(0, 0, 0, 0);


    const formatDate = (date: Date | null) => {
        if (!date) return "";
        return date.toISOString().split("T")[0];
    };

    const handleOpenPicker = (type: "start" | "end") => {
        if (Platform.OS === "web") return;
        setActivePicker(type);
        setShowPicker(true);
    };

    const handleSelectDate = (event: any, selectedDate?: Date) => {
        if (Platform.OS === "android") setShowPicker(false);
        if (!selectedDate) return;

        if (activePicker === "start") setStartDate(selectedDate);
        if (activePicker === "end") setEndDate(selectedDate);
        const clampToToday = (d: Date) => {
            const x = new Date(d);
            x.setHours(0,0,0,0);
            if (x < today) return new Date(today);
            return d;
        };

        if (activePicker === "start") setStartDate(clampToToday(selectedDate));
    };

    const rentalDays =
    startDate && endDate
        ? Math.max(
                1,
                Math.round(
                (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
                ) + 1
            )
        : 0;
    const isMin3Days = rentalDays >= 3;
    const isDatePicked = !!startDate && !!endDate;
    const isDateOrderCorrect = !!startDate && !!endDate && startDate <= endDate;
    const isDateValid = isDatePicked && isDateOrderCorrect && isMin3Days;
    const formatDateOnly = (d: Date) => d.toISOString().slice(0, 10); // YYYY-MM-DD
    const todayStr = formatDateOnly(today);

    // FIXED: sekarang benar
    const canSubmit = isDateValid;

    return (
        <View style={styles.root}>
            <AppBar title="Sewa Mobil" onBack={() => router.back()} />

                <View style={styles.content}>
                    {/* PILIH TANGGAL */}
                    <GreigePanel>
                        <Text style={styles.panelTitle}>Pilih Tanggal</Text>

                        {Platform.OS === "web" ? (
                            <>
                                <input
                                    type="date"
                                    style={styles.webInput}
                                    min={todayStr}
                                    value={formatDate(startDate)}
                                    onChange={(e) => setStartDate(new Date(e.target.value))}
                                />

                                <Text style={styles.sd}>s/d</Text>

                                <input
                                    type="date"
                                    style={styles.webInput}
                                    min={startDate ? formatDate(startDate) : todayStr}
                                    value={formatDate(endDate)}
                                    onChange={(e) => setEndDate(new Date(e.target.value))}
                                />

                                {!isDateOrderCorrect && startDate && endDate && (
                                    <Text style={{ color: "red", marginTop: 8 }}>
                                        Tanggal mulai tidak boleh lebih besar dari tanggal selesai.
                                    </Text>
                                )}

                                {!isMin3Days && startDate && endDate && (
                                    <Text style={{ color: "red", marginTop: 8 }}>
                                        Munimum jumlah hari sewa adalah 3 hari.
                                    </Text>
                                )}
                                </>
                            ) : (
                                <>
                                <WhitePill onPress={() => handleOpenPicker("start")}>
                                    <Text style={styles.pillText}>
                                        {startDate ? formatDate(startDate) : "Pilih tanggal mulai"}
                                    </Text>
                                </WhitePill>

                                <Text style={styles.sd}>s/d</Text>

                                <WhitePill onPress={() => handleOpenPicker("end")}>
                                    <Text style={styles.pillText}>
                                        {endDate ? formatDate(endDate) : "Pilih tanggal selesai"}
                                    </Text>
                                </WhitePill>

                                {!isDateOrderCorrect && startDate && endDate && (
                                    <Text style={{ color: "red", marginTop: 8 }}>
                                        Tanggal mulai tidak boleh lebih besar dari tanggal selesai.
                                    </Text>
                                )}
                            </>
                        )}
                    </GreigePanel>

                    {Platform.OS !== "web" && showPicker && (
                        <DateTimePicker
                            value={activePicker === "start" ? startDate || new Date() : endDate || new Date()}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            minimumDate={activePicker === "start" ? today : (startDate ?? today)} // penting
                            onChange={handleSelectDate}
                        />
                    )}

                    {/* BUTTON: PILIH MOBIL */}
                    <PrimaryButton
                    label="Pilih Mobil"
                    onPress={() =>
                        router.push({
                        pathname: "/car-list",
                        params: {
                            start: startDate ? formatDate(startDate) : "",
                            end: endDate ? formatDate(endDate) : "",
                        },
                        })
                    }
                    disabled={!canSubmit}
                    style={{ marginTop: spacing.xl }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.bg },
    content: { padding: spacing.lg },

    panelTitle: {
        ...typography.h1,
        textAlign: "center",
        marginBottom: spacing.md,
    },

    whitePill: {
        backgroundColor: colors.whitePill,
        borderRadius: 999,
        minHeight: 44,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.sm,
    },

    pillText: { ...typography.body, fontWeight: "700" },
    sd: { textAlign: "center", ...typography.small, marginVertical: spacing.md },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
    },

    webInput: {
        width: "94%",
        padding: 12,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: spacing.sm,
        // fontSize: 16,
        ...typography.datePill,
    },
});
