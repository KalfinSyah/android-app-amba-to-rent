import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="register-landing" />
      <Stack.Screen name="register-get-started" />
      <Stack.Screen name="register-form" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
