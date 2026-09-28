import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { Text, View } from "react-native";
import { useControlledSheet } from "../../hooks/useControlledSheet";
import { hapticLight } from "../../lib/haptics";
import { useApp } from "../../store/AppProvider";
import { AppButton } from "../AppButton";
import { SheetBackdrop } from "./SheetBackdrop";

export function ScanDecalSheet() {
  const ref = useRef<BottomSheetModal>(null);
  const { activeSheet, closeSheets, setDriver, openSheet } = useApp();
  useControlledSheet(ref, "scan", activeSheet);

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDynamicSizing
      onDismiss={() => {
        if (activeSheet === "scan") closeSheets();
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
        <Text className="text-lg font-bold text-white">Scan driver decal</Text>
        <Text className="mb-[18px] mt-1 text-[13px] text-muted">
          Point your camera at the QR on the dashboard.
        </Text>
        <View className="mb-4 h-[170px] items-center justify-center rounded-2xl border border-dashed border-hair-2 bg-surface">
          <Ionicons name="scan-outline" size={30} color="rgba(255,255,255,0.36)" />
          <Text className="mt-2 text-[12.5px] text-faint">Camera preview</Text>
        </View>
        <AppButton
          label="Simulate successful scan"
          onPress={() => {
            setDriver("0114");
            void hapticLight();
            openSheet("pay");
          }}
        />
        <AppButton
          label="Cancel"
          variant="ghost"
          onPress={closeSheets}
          className="mt-2"
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
}
