import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { FontAwesome } from "@expo/vector-icons";

// Biar splash screen nunggu sampai font selesai di-load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        "Playfair-Bold": require("../assets/fonts/PlayfairDisplay-Bold.ttf"),
        "Playfair-SemiBold": require("../assets/fonts/PlayfairDisplay-SemiBold.ttf"),
        "Playfair-Regular": require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
        "Varela-Regular": require("../assets/fonts/VarelaRound-Regular.ttf"),
        "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if (loaded) SplashScreen.hideAsync();
    }, [loaded]);

    if (!loaded) return null;

    return <Stack screenOptions={{ headerShown: false }} />;
}
