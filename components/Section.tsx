// components/Section.tsx
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "../theme";

export default function Section({
  title,
  children,
  footer,
}: {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={{ gap: spacing(1) }}>{children}</View>
      {footer ? <View style={{ marginTop: spacing(1) }}>{footer}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.sm,
    padding: spacing(2),
    borderWidth: 1,
    borderColor: colors.line,
    gap: spacing(1.5),
  },
  title: { color: colors.text, fontSize: 16, fontWeight: "700" },
});
