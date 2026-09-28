import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { Text, View } from "react-native";
import { useControlledSheet } from "../../hooks/useControlledSheet";
import { BIOMETRIC, KekePaysAPI } from "../../lib/api";
import { formatNaira } from "../../lib/format";
import { hapticSuccess } from "../../lib/haptics";
import { useApp } from "../../store/AppProvider";
import { AppButton } from "../AppButton";
import { LoadingOrb } from "../LoadingOrb";
import { SheetBackdrop } from "./SheetBackdrop";

export function ConfirmPaySheet() {
  const ref = useRef<BottomSheetModal>(null);
  const {
    activeSheet,
    currentFare,
    currentDriver,
    wallet,
    closeSheets,
    payFare,
    showToast,
  } = useApp();
  const [busy, setBusy] = useState(false);
  useControlledSheet(ref, "pay", activeSheet);

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDynamicSizing
      onDismiss={() => {
        setBusy(false);
        if (activeSheet === "pay") closeSheets();
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
        <Text className="text-lg font-bold text-white">
          Pay {formatNaira(currentFare)}
        </Text>
        <Text className="mb-[18px] mt-1 text-[13px] text-muted">
          To driver #{currentDriver}
        </Text>
        {busy ? (
          <LoadingOrb label="Verifying…" />
        ) : (
        <View className="flex-row gap-2.5">
          <View className="flex-1">
            <AppButton label="Cancel" variant="ghost" onPress={closeSheets} />
          </View>
          <View className="flex-1">
            <AppButton
              icon={BIOMETRIC.icon}
              label={`Confirm with ${BIOMETRIC.label}`}
              onPress={async () => {
                if (wallet.balance < currentFare) {
                  closeSheets();
                  showToast("Insufficient balance — top up first");
                  return;
                }
                setBusy(true);
                const api = await KekePaysAPI.payFare({
                  amount: currentFare,
                  driverId: currentDriver,
                });
                setBusy(false);
                if (api.status === "success") {
                  await payFare();
                  void hapticSuccess();
                }
              }}
            />
          </View>
        </View>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
}
