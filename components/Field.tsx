// components/Field.tsx
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radius, spacing } from "../theme";

export function InputWithIcon({
  label,
  icon,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType,
}: {
  label: string;
  icon: any;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (t: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad";
}) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <Ionicons name={icon} size={18} color={colors.subtext} style={{ marginHorizontal: 8 }} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={colors.subtext}
          style={styles.input}
        />
      </View>
    </View>
  );
}

export function Row({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  label: { color: colors.subtext, fontSize: 12, marginLeft: 4 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.sm,
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing(1.25),
    paddingVertical: spacing(1.25),
    color: "#000",
    fontSize: 14,
  },
  row: { flexDirection: "row", gap: spacing() },
});
