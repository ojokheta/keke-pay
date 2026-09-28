import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";
import { formatNaira } from "../lib/format";
import { AppButton } from "./AppButton";
import { Logo } from "./Logo";

export function BrandBar({ badge }: { badge: "PASSENGER" | "DRIVER" }) {
  return (
    <View className="flex-row items-center justify-between px-5 pb-2 pt-3.5">
      <View className="flex-row items-center gap-2.5">
        <Logo height={48} />
        <View className="rounded-full border border-hair bg-surface-2 px-2.5 py-[3px]">
          <Text className="text-[10.5px] font-bold uppercase tracking-wide text-muted">
            {badge}
          </Text>
        </View>
      </View>
    </View>
  );
}

interface HeaderProps {
  badge: "PASSENGER" | "DRIVER";
  subtitle: string;
  amountLabel: string;
  amount: number;
  footLeft: string;
  footRight: string;
  tone?: "green" | "gold";
  onTopUp?: () => void;
  onHistory?: () => void;
}

export function Header({
  badge,
  subtitle,
  amountLabel,
  amount,
  footLeft,
  footRight,
  tone = "green",
  onTopUp,
  onHistory,
}: HeaderProps) {
  const isGold = tone === "gold";

  return (
    <View>
      <BrandBar badge={badge} />
      <View className="px-5">
        <View className="mb-5 overflow-hidden rounded-3xl">
        <LinearGradient
          colors={isGold ? ["#5c3d00", "#e6a917"] : ["#0c4a34", "#1fbf75"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 22 }}
        >
          <View className="flex-row items-start justify-between">
            <Text
              className={`text-[13px] font-bold tracking-wide ${isGold ? "text-gold-ink" : "text-white"}`}
            >
              {subtitle}
            </Text>
            <View
              className={`h-6 w-[34px] rounded-md ${isGold ? "bg-gold-ink/25" : "bg-white/35"}`}
            />
          </View>
          <Text
            className={`mt-5 text-xs ${isGold ? "text-gold-ink/80" : "text-white/75"}`}
          >
            {amountLabel}
          </Text>
          <Text
            className={`mt-1 text-[34px] font-bold tabular-nums ${isGold ? "text-gold-ink" : "text-white"}`}
          >
            {formatNaira(amount)}
          </Text>
          <View className="mt-[22px] flex-row items-end justify-between">
            <Text
              className={`text-[11px] ${isGold ? "text-gold-ink/70" : "text-white/70"}`}
            >
              {footLeft}
            </Text>
            <Text
              className={`text-[11px] ${isGold ? "text-gold-ink/70" : "text-white/70"}`}
            >
              {footRight}
            </Text>
          </View>
        </LinearGradient>
      </View>

      {onTopUp || onHistory ? (
        <View className="mb-[22px] flex-row gap-2.5">
          {onTopUp ? (
            <View className="flex-1">
              <AppButton
                label="Top up"
                icon="add"
                onPress={onTopUp}
                className="py-[13px]"
              />
            </View>
          ) : null}
          {onHistory ? (
            <View className="flex-1">
              <Pressable
                onPress={onHistory}
                className="flex-row items-center justify-center gap-[7px] rounded-2xl border border-hair bg-surface-2 py-[13px] active:scale-95"
              >
                <Ionicons name="receipt-outline" size={16} color="#ffffff" />
                <Text className="text-sm font-semibold text-white">History</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      ) : null}
      </View>
    </View>
  );
}
