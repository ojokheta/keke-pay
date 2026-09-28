import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface BankRowProps {
  name: string;
  subtitle: string;
  selected?: boolean;
  dashed?: boolean;
  onPress?: () => void;
}

export function BankRow({ name, subtitle, selected, dashed, onPress }: BankRowProps) {
  if (dashed) {
    return (
      <Pressable
        onPress={onPress}
        className="mb-2.5 flex-row items-center justify-center rounded-2xl border border-dashed border-hair py-3.5"
      >
        <Ionicons name="add" size={16} color="rgba(255,255,255,0.62)" />
        <Text className="ml-1 text-sm font-semibold text-muted">{name}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      className={`mb-2.5 flex-row items-center gap-3 rounded-2xl border p-3.5 ${
        selected ? "border-accent" : "border-hair"
      }`}
    >
      <View className="h-9 w-9 items-center justify-center rounded-[10px] bg-surface-2">
        <Ionicons name="business-outline" size={16} color="rgba(255,255,255,0.62)" />
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-white">{name}</Text>
        <Text className="text-xs text-faint">{subtitle}</Text>
      </View>
      <View
        className={`h-[19px] w-[19px] rounded-full border ${
          selected ? "border-accent bg-accent" : "border-hair-2"
        }`}
      />
    </Pressable>
  );
}
