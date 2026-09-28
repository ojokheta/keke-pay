import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { Text, View } from "react-native";
import { useControlledSheet } from "../../hooks/useControlledSheet";
import { useApp } from "../../store/AppProvider";
import { AppButton } from "../AppButton";
import { SheetBackdrop } from "./SheetBackdrop";

export function DriverCodeSheet() {
  const ref = useRef<BottomSheetModal>(null);
  const { activeSheet, closeSheets, setDriver, openSheet, showToast } = useApp();
  const [code, setCode] = useState("");
  useControlledSheet(ref, "code", activeSheet);

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDynamicSizing
      keyboardBehavior="interactive"
      android_keyboardInputMode="adjustResize"
      onDismiss={() => {
        if (activeSheet === "code") closeSheets();
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
        <Text className="text-lg font-bold text-white">Enter driver code</Text>
        <Text className="mb-[18px] mt-1 text-[13px] text-muted">
          4-digit ID printed on the decal.
        </Text>
        <BottomSheetTextInput
          value={code}
          onChangeText={(value) => setCode(value.replace(/\D/g, "").slice(0, 4))}
          keyboardType="number-pad"
          maxLength={4}
          placeholder="0000"
          placeholderTextColor="rgba(255,255,255,0.36)"
          className="mb-4 rounded-2xl border border-hair bg-surface py-[15px] text-center text-2xl font-bold tracking-[8px] text-white"
        />
        <View className="flex-row gap-2.5">
          <View className="flex-1">
            <AppButton label="Cancel" variant="ghost" onPress={closeSheets} />
          </View>
          <View className="flex-1">
            <AppButton
              label="Continue"
              onPress={() => {
                if (code.length < 4) {
                  showToast("Enter the full 4-digit code");
                  return;
                }
                setDriver(code);
                openSheet("pay");
              }}
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
