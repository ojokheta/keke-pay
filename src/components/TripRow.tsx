import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { formatNaira } from "../lib/format";
import type { TransactionHistory } from "../types";

interface TripRowProps {
  trip: TransactionHistory;
}

export function TripRow({ trip }: TripRowProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-hair py-[13px]">
      <View className="flex-row items-center gap-3">
        <View className="h-9 w-9 items-center justify-center rounded-[10px] bg-surface-2">
          <Ionicons name="speedometer-outline" size={17} color="rgba(255,255,255,0.62)" />
        </View>
        <View>
          <Text className="text-sm font-semibold text-white">{trip.who}</Text>
          <Text className="text-[11.5px] text-faint">{trip.when}</Text>
        </View>
      </View>
      <Text
        className={`text-[14.5px] font-bold tabular-nums ${
          trip.sign === "+" ? "text-accent" : "text-white"
        }`}
      >
        {trip.sign}
        {formatNaira(trip.amount)}
      </Text>
    </View>
  );
}
