import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type ButtonVariant = "solid" | "ghost" | "gold" | "flash";

interface AppButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  full?: boolean;
  className?: string;
}

const variantClass: Record<ButtonVariant, string> = {
  solid: "bg-accent",
  ghost: "bg-surface-2 border border-hair",
  gold: "bg-gold-b",
  flash: "bg-black/15",
};

const variantText: Record<ButtonVariant, string> = {
  solid: "text-accent-ink",
  ghost: "text-white",
  gold: "text-gold-ink",
  flash: "text-accent-ink",
};

const variantIcon: Record<ButtonVariant, string> = {
  solid: "#04150c",
  ghost: "#ffffff",
  gold: "#1c1200",
  flash: "#04150c",
};

export function AppButton({
  label,
  onPress,
  variant = "solid",
  icon,
  disabled,
  full = true,
  className = "",
}: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      className={`flex-row items-center justify-center gap-[7px] rounded-2xl py-[15px] active:scale-95 ${variantClass[variant]} ${full ? "w-full" : ""} ${disabled ? "opacity-60" : ""} ${className}`}
    >
      {icon ? (
        <Ionicons name={icon} size={18} color={variantIcon[variant]} />
      ) : null}
      <Text className={`text-[15px] font-semibold ${variantText[variant]}`}>
        {label}
      </Text>
    </Pressable>
  );
}
