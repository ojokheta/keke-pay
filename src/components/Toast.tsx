import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <View className="absolute bottom-6 left-5 right-5 z-50 flex-row items-center gap-2.5 rounded-2xl border border-hair-2 bg-surface-2 px-4 py-3.5">
      <Ionicons name="checkmark-circle" size={18} color="#2ee881" />
      <Text className="flex-1 text-[13.5px] font-semibold text-white">{message}</Text>
    </View>
  );
}
