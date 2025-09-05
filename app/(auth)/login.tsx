// app/(auth)/login.tsx
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  Image as RNImage,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors, radius, spacing } from "../../theme";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <RNImage
          source={require("../../assets/images/logo2.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.tagline}>Vulcanizing, Repair, and Roadside Help</Text>
      </View>

      {/* Email */}
      <View style={styles.borderWrap}>
        <View style={styles.innerRow}>
          <Ionicons
            name="mail-outline"
            size={18}
            color={colors.subtext}
            style={{ marginHorizontal: 8 }}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#808080"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Password */}
      <View style={styles.borderWrap}>
        <View style={styles.innerRow}>
          <Ionicons
            name="lock-closed-outline"
            size={18}
            color={colors.subtext}
            style={{ marginHorizontal: 8 }}
          />
          <TextInput
            value={pw}
            onChangeText={setPw}
            placeholder="Password"
            placeholderTextColor="#808080"
            style={styles.input}
            secureTextEntry
          />
        </View>
      </View>

      <Text style={styles.forgot}>Forgot Password?</Text>

      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [styles.btnPrimary, pressed && { opacity: 0.9 }]}
        accessibilityRole="button"
      >
        <Text style={styles.btnPrimaryText}>Login</Text>
      </Pressable>

      <Text style={styles.or}>or</Text>

      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [styles.btnGoogle, pressed && { opacity: 0.95 }]}
        accessibilityRole="button"
      >
        <Text style={styles.btnGoogleText}>Sign in with Google</Text>
      </Pressable>

      {/* Create account → /signup (because (auth) is a pathless group) */}
      <Pressable
        onPress={() => router.push("/signup")}
        style={({ pressed }) => [styles.btnGray, pressed && { opacity: 0.95 }]}
        accessibilityRole="button"
      >
        <Text style={styles.btnGrayText}>Create an account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: spacing(3) },
  header: { alignItems: "center", marginBottom: spacing(2) },
  logo: { width: 120, height: 120, marginBottom: 6 },
  brand: { color: "#000", fontSize: 24, fontWeight: "bold", marginTop: 6 },
  tagline: { color: "gray", fontSize: 14 },

  borderWrap: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: radius.sm,
    padding: 5,
    marginBottom: spacing(1.25),
  },
  innerRow: { flexDirection: "row", alignItems: "center" },
  input: {
    flex: 1,
    paddingVertical: spacing(1.25),
    paddingHorizontal: spacing(1.25),
    color: "#000",
  },

  forgot: {
    color: "#21499F",
    fontSize: 12,
    textAlign: "right",
    marginBottom: spacing(1),
  },

  // Full-width buttons (prevents the “missing” look on web)
  btnPrimary: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: spacing(1.25),
    alignItems: "center",
    alignSelf: "stretch",
    width: "100%",
  },
  btnPrimaryText: { color: "#fff", fontWeight: "700", fontSize: 15 },

  or: { textAlign: "center", color: colors.text, marginVertical: spacing(1) },

  btnGoogle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.googleBlue,
    paddingVertical: spacing(1.25),
    borderRadius: radius.sm,
    alignItems: "center",
    alignSelf: "stretch",
    width: "100%",
    marginBottom: spacing(1),
  },
  btnGoogleText: { color: colors.googleBlue, fontWeight: "700" },

  btnGray: {
    backgroundColor: "gray",
    paddingVertical: spacing(1.25),
    borderRadius: radius.sm,
    alignItems: "center",
    alignSelf: "stretch",
    width: "100%",
  },
  btnGrayText: { color: "#fff", fontWeight: "700" },
});
