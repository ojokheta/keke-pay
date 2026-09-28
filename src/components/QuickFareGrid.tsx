import { Pressable, Text, View } from "react-native";
import { FARE_OPTIONS } from "../constants";
import { formatNaira } from "../lib/format";
import type { FareOption } from "../types";

interface QuickFareGridProps {
  selectedAmount?: number | null;
  onSelect: (option: FareOption) => void;
}

export function QuickFareGrid({ selectedAmount, onSelect }: QuickFareGridProps) {
  return (
    <View>
      <Text className="mb-2.5 mt-1 text-xs font-bold uppercase tracking-wider text-faint">
        Pay a fare
      </Text>
      <View className="mb-[18px]">
        {[0, 1].map((row) => (
          <View key={row} className={`flex-row gap-[9px] ${row === 0 ? "mb-[9px]" : ""}`}>
            {FARE_OPTIONS.slice(row * 3, row * 3 + 3).map((option) => {
              const selected = option.amount !== null && option.amount === selectedAmount;
              const isOther = option.amount === null;
              return (
                <Pressable
                  key={option.id}
                  onPress={() => onSelect(option)}
                  className={`flex-1 items-center rounded-2xl border bg-surface py-4 active:scale-95 ${
                    selected ? "border-accent" : "border-hair"
                  }`}
                >
                  <Text
                    className={`font-bold tabular-nums ${
                      isOther ? "text-sm text-muted" : "text-lg text-white"
                    }`}
                  >
                    {isOther ? "Other" : formatNaira(option.amount ?? 0)}
                  </Text>
                  {isOther ? null : (
                    <Text className="mt-0.5 text-[11px] text-faint">{option.label}</Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}
