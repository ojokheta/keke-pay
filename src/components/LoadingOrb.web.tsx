import { ThinkingOrb } from "thinking-orbs";
import { Text, View } from "react-native";

interface LoadingOrbProps {
  label?: string;
}

export function LoadingOrb({ label }: LoadingOrbProps) {
  return (
    <View className="items-center justify-center py-2" accessibilityLabel={label ?? "Loading"}>
      <ThinkingOrb state="breathing" size={64} theme="dark" />
      {label ? (
        <Text className="mt-3 text-[13px] font-semibold text-muted">{label}</Text>
      ) : null}
    </View>
  );
}
