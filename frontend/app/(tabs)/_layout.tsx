import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { Stack } from "expo-router";

function TabIcon({ name, color, focused, label }: any) {
  return (
    <View style={[styles.tabItem, focused && styles.tabItemActive]}>
      <FontAwesome name={name} size={25} color={color} />
      <Text style={[styles.tabLabel, { color }]}>{label}</Text>
    </View>
  );
}

export default function TabsLayout() {
    return (
        <Tabs
        screenOptions={{
                headerShown: false,
                tabBarStyle: {
                backgroundColor: colors.tabBar,
                height: 72,
                borderTopWidth: 0,
            },
            tabBarActiveTintColor: colors.text,
            tabBarInactiveTintColor: colors.muted,
            tabBarShowLabel: false,
        }}
        >
            <Tabs.Screen
                name="beranda/index"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                        name="home"
                        color={color}
                        focused={focused}
                        label="Beranda"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="katalog/index"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                        name="car"
                        color={color}
                        focused={focused}
                        label="Katalog"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="pesanan/index"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                        name="clock-o"
                        color={color}
                        focused={focused}
                        label="Pesanan"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile/index"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                        name="user"
                        color={color}
                        focused={focused}
                        label="Profil"
                        />
                    ),
                }}
            />
        </Tabs>
    );
}


const styles = StyleSheet.create({
    tabItem: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 999,
        marginTop: 32,
    },
    tabItemActive: {
        backgroundColor: colors.whitePill,
        paddingHorizontal: 18,
    },
    tabLabel: {
        ...typography.small,
        marginTop: 0,
    },
});
