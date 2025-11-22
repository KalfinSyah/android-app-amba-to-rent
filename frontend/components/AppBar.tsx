import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export function AppBar({
  title,
  onBack,
  rightIcon = "bell-o",
  onRightPress,
}: {
  title: string;
  onBack?: () => void;
  rightIcon?: React.ComponentProps<typeof FontAwesome>["name"];
  onRightPress?: () => void;
}) {
  return (
    <View style={styles.wrap}>
      <View style={styles.pill}>
        <View style={styles.left}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <FontAwesome name="arrow-left" size={18} color={colors.text} />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>

        <TouchableOpacity onPress={onRightPress} style={styles.rightBtn}>
          <FontAwesome name={rightIcon} size={18} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.bg,
  },
  pill: {
    backgroundColor: colors.headerPill,
    borderRadius: 999,
    height: 56,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: { flexDirection: "row", alignItems: "center" },
  backBtn: { marginRight: spacing.md, padding: spacing.xs },
  title: { ...typography.h2, color: colors.text },
  rightBtn: { padding: spacing.xs },
});
