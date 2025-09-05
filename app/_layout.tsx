// app/_layout.tsx
import { Stack } from "expo-router";
import { View } from "react-native";
import { colors } from "../theme";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }} />
    </View>
  );
}
