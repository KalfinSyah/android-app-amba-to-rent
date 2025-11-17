import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { router, Stack } from "expo-router";

export default function Login() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Stack.Screen options={{ headerShown: false }} />
                {/* Title */}
                <Text style={styles.title}>Login</Text>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                    placeholder="Example: Alex@hotmail.com"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry
                    />
                </View>

                <View style={styles.bottomContainer}>
                    {/* Login Button */}
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>

                    {/* Register Link */}
                    <Text style={styles.bottomText}>
                        Belum punya akun?{" "}
                        <Text
                        style={styles.registerLink}
                        onPress={() => router.push("/register")}
                        >
                        Register
                        </Text>
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60, // makes room for the bottom bar so content isn't hidden
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 80,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
    bottomContainer: {
        position: "absolute",
        bottom: 69,
        left: 20,
        right: 20,
        alignItems: "center",
    },
  loginButton: {
        backgroundColor: "#4A1F0F",
        paddingVertical: 18,
        borderRadius: 12,
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
  },
  loginText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
  },
  bottomText: {
        fontSize: 12,
        textAlign: "center",
  },
  registerLink: {
    fontWeight: "bold",
  },
});
