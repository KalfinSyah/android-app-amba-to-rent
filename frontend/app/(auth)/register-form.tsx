import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { TextField } from "@/components/TextField";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FieldErrors = Partial<{
  name: string;
  email: string;
  phone: string;
  pass: string;
  confirm: string;
  form: string; // error umum (tanpa box)
}>;

function isValidEmail(v: string) {
  // simple & cukup untuk UI
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function isValidPhoneID(v: string) {
  // longgar: angka 9-15 digit, boleh diawali +62 atau 0
  const s = v.trim().replace(/\s|-/g, "");
  return /^(\+62|0)?\d{9,15}$/.test(s);
}

function mapLaravelErrorsToFields(errs: any): FieldErrors {
  // Laravel biasanya: { errors: { email_user: ["..."], password: ["..."] } }
  if (!errs || typeof errs !== "object") return {};

  const e: FieldErrors = {};
  const getFirst = (key: string) => {
    const v = errs[key];
    if (Array.isArray(v) && v.length) return String(v[0]);
    if (typeof v === "string") return v;
    return null;
  };

  // Sesuaikan key backend Anda
  const emailMsg = getFirst("email_user") || getFirst("email");
  const nameMsg = getFirst("nama_user") || getFirst("name");
  const phoneMsg = getFirst("no_telp_user") || getFirst("phone");
  const passMsg = getFirst("password");
  const confirmMsg = getFirst("password_confirmation") || getFirst("confirm");

  if (nameMsg) e.name = nameMsg;
  if (emailMsg) e.email = emailMsg;
  if (phoneMsg) e.phone = phoneMsg;
  if (passMsg) e.pass = passMsg;
  if (confirmMsg) e.confirm = confirmMsg;

  return e;
}

export default function RegisterFormScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  // Validasi lokal (langsung per-field)
  const localErrors = useMemo<FieldErrors>(() => {
    const e: FieldErrors = {};

    if (name.trim().length > 0 && name.trim().length < 3) {
      e.name = "Nama minimal 3 karakter.";
    }

    if (email.trim().length > 0 && !isValidEmail(email)) {
      e.email = "Format email tidak valid.";
    }

    if (phone.trim().length > 0 && !isValidPhoneID(phone)) {
      e.phone = "Nomor telepon tidak valid.";
    }

    if (pass.length > 0 && pass.length < 6) {
      e.pass = "Password minimal 6 karakter.";
    }

    if (confirm.length > 0 && pass !== confirm) {
      e.confirm = "Password harus cocok.";
    }

    return e;
  }, [name, email, phone, pass, confirm]);

  // Field dianggap valid jika:
  // - tidak kosong
  // - tidak ada error lokal untuk field itu
  const canSubmit =
    name.trim().length >= 3 &&
    isValidEmail(email) &&
    isValidPhoneID(phone) &&
    pass.length >= 6 &&
    confirm.length > 0 &&
    pass === confirm &&
    !loading;

  const handleRegister = async () => {
    if (!canSubmit) {
      // Tampilkan error lokal (tanpa box)
      setErrors((prev) => ({ ...prev, ...localErrors }));
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nama_user: name.trim(),
          email_user: email.trim(),
          no_telp_user: phone.trim(),
          password: pass,
          // jika backend Anda butuh confirmation:
          // password_confirmation: confirm,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Prioritas: errors per-field dari Laravel, lalu message umum
        const fieldErrs = mapLaravelErrorsToFields(data?.errors);
        const msg = data?.message || "Register gagal.";

        setErrors({
          ...fieldErrs,
          // tanpa box: error umum cukup teks kecil
          ...(Object.keys(fieldErrs).length === 0 ? { form: msg } : {}),
        });

        return;
      }

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user_id", String(data.user.id));

      router.replace("/(tabs)/beranda");
    } catch (error) {
      setErrors({ form: "Terjadi kesalahan jaringan." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Register</Text>

        <View style={{ height: spacing.xxl }} />

        <TextField
          label="Nama"
          value={name}
          onChangeText={(v) => {
            setName(v);
            setErrors((p) => ({ ...p, name: undefined, form: undefined }));
          }}
          placeholder="Example: Alex"
          helper={errors.name || localErrors.name || ""}
        />

        <TextField
          label="Email"
          value={email}
          onChangeText={(v) => {
            setEmail(v);
            setErrors((p) => ({ ...p, email: undefined, form: undefined }));
          }}
          placeholder="Example: alex@email.com"
          helper={errors.email || localErrors.email || ""}
        />

        <TextField
          label="No. Telp"
          value={phone}
          onChangeText={(v) => {
            setPhone(v);
            setErrors((p) => ({ ...p, phone: undefined, form: undefined }));
          }}
          placeholder="Example: 0812xxxxxxx"
          helper={errors.phone || localErrors.phone || ""}
        />

        <TextField
          label="Password"
          value={pass}
          onChangeText={(v) => {
            setPass(v);
            setErrors((p) => ({ ...p, pass: undefined, form: undefined }));
          }}
          secureTextEntry
          helper={errors.pass || localErrors.pass || ""}
        />

        <TextField
          label="Konfirmasi Password"
          value={confirm}
          onChangeText={(v) => {
            setConfirm(v);
            setErrors((p) => ({ ...p, confirm: undefined, form: undefined }));
          }}
          secureTextEntry
          helper={errors.confirm || localErrors.confirm || ""}
        />

        {/* Error umum tanpa box (teks saja) */}
        {!!errors.form && <Text style={styles.formErrorText}>{errors.form}</Text>}

        <View style={{ height: spacing.xxl }} />

        <PrimaryButton
          label={loading ? "Memproses..." : "Register"}
          onPress={handleRegister}
          style={{ width: "100%" }}
          disabled={!canSubmit}
        />

        <View style={{ height: spacing.sm }} />

        <View style={styles.linkRow}>
          <Text style={styles.linkText}>Sudah punya akun? </Text>
          <Pressable onPress={() => router.push("/login")}>
            <Text style={styles.linkBold}>Login</Text>
          </Pressable>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  container: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },

  title: {
    marginTop: spacing.lg,
    ...typography.screenTitle,
    textAlign: "center",
    color: colors.text,
  },

  formErrorText: {
    ...typography.small,
    color: "#B00020",
    fontWeight: "700",
    textAlign: "center",
    marginTop: spacing.sm,
  },

  linkRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: { ...typography.small, color: colors.text },
  linkBold: {
    ...typography.small,
    color: colors.text,
    fontWeight: "800",
  },
});
