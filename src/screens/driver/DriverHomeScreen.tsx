import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { AppButton } from "../../components/AppButton";
import { Header } from "../../components/Header";
import { hapticLight } from "../../lib/haptics";
import { useApp } from "../../store/AppProvider";

export function DriverHomeScreen() {
  const { profile, wallet, receiveFare } = useApp();
  const driverId = profile?.role === "driver" ? profile.driverId : "0114";

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 26 }}
      showsVerticalScrollIndicator={false}
    >
      <Header
        badge="DRIVER"
        subtitle="TODAY'S EARNINGS"
        amountLabel="Ready for payout"
        amount={wallet.earnings}
        footLeft={`${wallet.tripCount} trips`}
        footRight={`Driver #${driverId}`}
        tone="gold"
      />
      <View className="items-center px-5 pt-1.5">
        <View className="mb-5 flex-row items-center gap-1.5 rounded-full border border-hair bg-surface-2 px-4 py-[7px]">
          <Ionicons name="car-outline" size={14} color="rgba(255,255,255,0.62)" />
          <Text className="text-xs text-muted">Driver ID · {driverId}</Text>
        </View>
        <View className="mb-5 h-[190px] w-[190px] items-center justify-center rounded-3xl bg-white p-3.5">
          <QRCode value={`kekepays://pay?driver=${driverId}`} size={160} />
        </View>
        <Text className="mb-[22px] text-sm text-muted">
          Show this decal — passenger scans to pay
        </Text>
        <View className="w-full flex-row gap-2.5">
          <View className="flex-1">
            <AppButton
              label="Simulate ₦200"
              icon="flash-outline"
              variant="ghost"
              className="py-[13px]"
              onPress={() => {
                void hapticLight();
                receiveFare(200);
              }}
            />
          </View>
          <View className="flex-1">
            <AppButton
              label="Simulate ₦500"
              icon="flash-outline"
              variant="ghost"
              className="py-[13px]"
              onPress={() => {
                void hapticLight();
                receiveFare(500);
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
