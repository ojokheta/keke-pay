import { BottomSheetModal, BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { useControlledSheet } from "../../hooks/useControlledSheet";
import { useApp } from "../../store/AppProvider";
import { AppButton } from "../AppButton";
import { SheetBackdrop } from "./SheetBackdrop";

export function PayMethodSheet() {
  const ref = useRef<BottomSheetModal>(null);
  const { activeSheet, currentFare, setFare, openSheet, closeSheets } = useApp();
  useControlledSheet(ref, "method", activeSheet);

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDynamicSizing
      onDismiss={() => {
        if (activeSheet === "method") closeSheets();
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
        <Text className="text-lg font-bold text-white">Pay driver</Text>
        <Text className="mb-[18px] mt-1 text-[13px] text-muted">
          Confirm the fare, then identify the driver.
        </Text>
        <BottomSheetTextInput
          keyboardType="number-pad"
          value={String(currentFare)}
          onChangeText={(text) => setFare(parseInt(text, 10) || 0)}
          className="mb-4 rounded-2xl border border-hair bg-surface py-[15px] text-center text-[28px] font-bold tabular-nums text-white"
        />
        <View className="flex-row gap-2.5">
          <Pressable
            onPress={() => openSheet("scan")}
            className="flex-1 items-center rounded-2xl border border-hair bg-surface py-3.5 active:scale-95"
          >
            <Ionicons name="qr-code-outline" size={20} color="rgba(255,255,255,0.62)" />
            <Text className="mt-1.5 text-xs font-semibold text-white">Scan decal</Text>
          </Pressable>
          <Pressable
            onPress={() => openSheet("code")}
            className="flex-1 items-center rounded-2xl border border-hair bg-surface py-3.5 active:scale-95"
          >
            <Ionicons name="keypad-outline" size={20} color="rgba(255,255,255,0.62)" />
            <Text className="mt-1.5 text-xs font-semibold text-white">Enter code</Text>
          </Pressable>
        </View>
        <AppButton
          label="Cancel"
          variant="ghost"
          onPress={closeSheets}
          className="mt-3.5"
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
}
