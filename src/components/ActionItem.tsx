import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

interface ActionItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  danger?: boolean;
  onPress: () => void;
}

export function ActionItem({ icon, label, danger, onPress }: ActionItemProps) {
  const color = danger ? "#ff453a" : "rgba(255,255,255,0.62)";
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 border-b border-hair py-3.5"
    >
      <Ionicons name={icon} size={19} color={color} />
      <Text className={`text-[14.5px] font-semibold ${danger ? "text-danger" : "text-white"}`}>
        {label}
      </Text>
    </Pressable>
  );
}
