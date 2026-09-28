import { ActivityIndicator, Text, View } from "react-native";

interface LoadingOrbProps {
  label?: string;
}

/** Native fallback — `thinking-orbs` renders on HTML canvas (web). */
export function LoadingOrb({ label }: LoadingOrbProps) {
  return (
    <View className="items-center justify-center py-2" accessibilityLabel={label ?? "Loading"}>
      <ActivityIndicator size="large" color="#2ee881" />
      {label ? (
        <Text className="mt-3 text-[13px] font-semibold text-muted">{label}</Text>
      ) : null}
    </View>
  );
}
