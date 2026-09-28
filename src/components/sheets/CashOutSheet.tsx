import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { Text, View } from "react-native";
import { useControlledSheet } from "../../hooks/useControlledSheet";
import { BIOMETRIC, KekePaysAPI } from "../../lib/api";
import { formatNaira, last4 } from "../../lib/format";
import { hapticSuccess } from "../../lib/haptics";
import { useApp } from "../../store/AppProvider";
import { AppButton } from "../AppButton";
import { LoadingOrb } from "../LoadingOrb";
import { SheetBackdrop } from "./SheetBackdrop";

export function CashOutSheet() {
  const ref = useRef<BottomSheetModal>(null);
  const { activeSheet, wallet, profile, closeSheets, cashOut } = useApp();
  const [busy, setBusy] = useState(false);
  useControlledSheet(ref, "cashout", activeSheet);
  const bankLabel =
    profile?.role === "driver"
      ? `${profile.bank} •••${last4(profile.acct)}`
      : "Primary bank";

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDynamicSizing
      onDismiss={() => {
        setBusy(false);
        if (activeSheet === "cashout") closeSheets();
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
          Cash out {formatNaira(wallet.earnings)}
        </Text>
        <Text className="mb-[18px] mt-1 text-[13px] text-muted">
          To {bankLabel} — usually arrives in minutes.
        </Text>
        <View className="flex-row gap-2.5">
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
              variant="gold"
              icon={BIOMETRIC.icon}
              label={`Confirm with ${BIOMETRIC.label}`}
              onPress={async () => {
                if (profile?.role !== "driver") return;
                setBusy(true);
                const res = await KekePaysAPI.withdraw({
                  amount: wallet.earnings,
                  bank: profile.bank,
                });
                setBusy(false);
                if (res.status === "success") {
                  await cashOut();
                  void hapticSuccess();
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
