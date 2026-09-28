import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useRef } from "react";
import { Text, View } from "react-native";
import { useControlledSheet } from "../../hooks/useControlledSheet";
import { formatNaira } from "../../lib/format";
import { useApp } from "../../store/AppProvider";
import { AppButton } from "../AppButton";

export function PaymentConfirmationSheet() {
  const ref = useRef<BottomSheetModal>(null);
  const { activeSheet, confirmation, dismissConfirmation } = useApp();
  const gold =
    confirmation?.variant === "received" || confirmation?.variant === "cashed_out";
  const snapPoints = useMemo(() => ["48%"], []);
  useControlledSheet(ref, "confirmation", activeSheet);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose
      onDismiss={dismissConfirmation}
      handleIndicatorStyle={{
        backgroundColor: gold ? "rgba(28,18,0,0.25)" : "rgba(4,21,12,0.25)",
        width: 36,
        height: 5,
      }}
      backgroundStyle={{
        backgroundColor: gold ? "#e6a917" : "#2ee881",
        borderRadius: 24,
      }}
    >
      <BottomSheetView className="flex-1 items-center px-7 pb-10 pt-4">
        <View
          className={`mb-[18px] h-20 w-20 items-center justify-center rounded-full ${
            gold ? "bg-gold-ink/15" : "bg-accent-ink/15"
          }`}
        >
          <Ionicons
            name="checkmark"
            size={40}
            color={gold ? "#1c1200" : "#04150c"}
          />
        </View>
        <Text
          className={`text-[46px] font-bold tabular-nums ${gold ? "text-gold-ink" : "text-accent-ink"}`}
        >
          {formatNaira(confirmation?.amount ?? 0)}
        </Text>
        <Text
          className={`mt-1.5 text-[15px] font-semibold ${gold ? "text-gold-ink/75" : "text-accent-ink/75"}`}
        >
          {confirmation?.message ?? "Done"}
        </Text>
        <AppButton
          label={confirmation?.doneLabel ?? "Done"}
          variant="flash"
          full={false}
          onPress={dismissConfirmation}
          className={`mt-9 px-[34px] ${gold ? "bg-gold-ink/15" : "bg-accent-ink/15"}`}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
}
