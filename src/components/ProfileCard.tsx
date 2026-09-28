import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface ProfileCardProps {
  name: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export function ProfileCard({ name, subtitle, icon }: ProfileCardProps) {
  return (
    <View className="mb-[18px] flex-row items-center gap-3 rounded-2xl border border-hair bg-surface p-4">
      <View className="h-11 w-11 items-center justify-center rounded-full bg-surface-2">
        <Ionicons name={icon} size={19} color="rgba(255,255,255,0.62)" />
      </View>
      <View>
        <Text className="text-[15px] font-bold text-white">{name}</Text>
        <Text className="text-xs text-faint">{subtitle}</Text>
      </View>
    </View>
  );
}
