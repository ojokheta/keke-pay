import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { TOPUP_AMOUNTS } from "../../constants";
import { useControlledSheet } from "../../hooks/useControlledSheet";
import { KekePaysAPI } from "../../lib/api";
import { formatNaira } from "../../lib/format";
import { hapticLight, hapticSuccess } from "../../lib/haptics";
import { useApp } from "../../store/AppProvider";
import type { TopUpMethod } from "../../types";
import { AppButton } from "../AppButton";
import { LoadingOrb } from "../LoadingOrb";
import { SheetBackdrop } from "./SheetBackdrop";

const METHODS: { id: TopUpMethod; icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { id: "Card", icon: "card-outline", label: "Card" },
  { id: "Bank transfer", icon: "business-outline", label: "Transfer" },
  { id: "USSD", icon: "phone-portrait-outline", label: "USSD" },
];

export function TopUpSheet() {
  const ref = useRef<BottomSheetModal>(null);
  const { activeSheet, closeSheets, topUp, showToast } = useApp();
  const [amount, setAmount] = useState(500);
  const [method, setMethod] = useState<TopUpMethod>("Card");
  const [busy, setBusy] = useState(false);
  useControlledSheet(ref, "topup", activeSheet);

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDynamicSizing
      onDismiss={() => {
        setBusy(false);
        if (activeSheet === "topup") closeSheets();
      }}
      backdropComponent={SheetBackdrop}
      handleIndicatorStyle={{
        backgroundColor: "rgba(255,255,255,0.16)",
        width: 36,
        height: 5,
      }}
      backgroundStyle={{ backgroundColor: "#1c1c1e", borderRadius: 24 }}
    >
      <BottomSheetView className="px-5 pb-8">
        <Text className="text-lg font-bold text-white">Top up wallet</Text>
        <Text className="mb-[18px] mt-1 text-[13px] text-muted">
          Card, transfer or USSD via Paystack — funds land instantly.
        </Text>
        <View className="mb-3.5 flex-row gap-2.5">
          {METHODS.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => {
                void hapticLight();
                setMethod(item.id);
              }}
              className={`flex-1 items-center rounded-2xl border bg-surface py-3.5 ${
                method === item.id ? "border-accent" : "border-hair"
              }`}
            >
              <Ionicons name={item.icon} size={20} color="rgba(255,255,255,0.62)" />
              <Text className="mt-1.5 text-xs font-semibold text-white">{item.label}</Text>
            </Pressable>
          ))}
        </View>
        <View className="flex-row gap-[9px]">
          {TOPUP_AMOUNTS.map((value) => (
            <Pressable
              key={value}
              onPress={() => {
                void hapticLight();
                setAmount(value);
              }}
              className={`flex-1 items-center rounded-2xl border bg-surface py-4 ${
                amount === value ? "border-accent" : "border-hair"
              }`}
            >
              <Text className="text-lg font-bold tabular-nums text-white">
                {formatNaira(value)}
              </Text>
            </Pressable>
          ))}
        </View>
        <View className="mt-4 flex-row gap-2.5">
          {busy ? (
            <View className="flex-1">
              <LoadingOrb label="Processing…" />
            </View>
          ) : (
            <>
          <View className="flex-1">
            <AppButton label="Cancel" variant="ghost" onPress={closeSheets} />
          </View>
          <View className="flex-1">
            <AppButton
              label="Fund wallet"
              onPress={async () => {
                setBusy(true);
                const res = await KekePaysAPI.charge({ amount, method });
                setBusy(false);
                if (res.status === "success") {
                  await topUp(amount, method);
                  void hapticSuccess();
                  showToast(`${formatNaira(amount)} added via ${method}`);
                }
              }}
            />
          </View>
            </>
          )}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
