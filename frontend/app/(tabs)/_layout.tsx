import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

function TabIcon({ name, color, focused, label }: any) {
    return (
        <View style={[styles.tabItem, focused && styles.tabItemActive]}>
            <FontAwesome name={name} size={20} color={color} />
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
            tabBarShowLabel: false,
        }}
        >
        <Tabs.Screen
            name="home"
            options={{
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon name="star-o" color={focused ? colors.text : colors.muted} focused={focused} label="Beranda" />
                ),
            }}
        />
        <Tabs.Screen
            name="rent"
            options={{
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon name="car" color={focused ? colors.text : colors.muted} focused={focused} label="Daftar Mobil" />
                ),
            }}
        />
        <Tabs.Screen
            name="orders"
            options={{
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon name="clock-o" color={focused ? colors.text : colors.muted} focused={focused} label="Pesanan" />
                ),
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon name="user" color={focused ? colors.text : colors.muted} focused={focused} label="Profil" />
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
        paddingVertical: 8,
        borderRadius: 999,
    },
    tabItemActive: {
        backgroundColor: colors.whitePill,
        paddingHorizontal: 18,
    },
    tabLabel: {
        ...typography.small,
        marginTop: 4,
    },
});
