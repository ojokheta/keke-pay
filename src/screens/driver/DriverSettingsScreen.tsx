import { ScrollView, Text, View } from "react-native";
import { ActionItem } from "../../components/ActionItem";
import { AppButton } from "../../components/AppButton";
import { BankRow } from "../../components/BankRow";
import { BrandBar } from "../../components/Header";
import { ProfileCard } from "../../components/ProfileCard";
import { last4 } from "../../lib/format";
import { hapticLight } from "../../lib/haptics";
import { useApp } from "../../store/AppProvider";
import { SectionTitle } from "../OnboardingScreen";

export function DriverSettingsScreen() {
  const { profile, wallet, setStage, logout, openSheet, showToast } = useApp();
  const driver = profile?.role === "driver" ? profile : null;

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 26 }}
      showsVerticalScrollIndicator={false}
    >
      <BrandBar badge="DRIVER" />
      <View className="px-5">
        <ProfileCard
          name={driver?.name ?? "Driver"}
          subtitle={`${driver?.vehicle ?? "Keke Napep"} · #${driver?.driverId ?? "0114"}`}
          icon="car-outline"
        />
        <SectionTitle>Trusted banks</SectionTitle>
        {driver ? (
          <BankRow
            name={driver.bank}
            subtitle={`•••• ${last4(driver.acct)} · Primary`}
            selected
          />
        ) : null}
        <BankRow
          dashed
          name="Add another bank"
          subtitle=""
          onPress={() => showToast("Linking additional banks is coming soon")}
        />
        <Text className="my-3.5 text-center text-[11.5px] leading-5 text-faint">
          Auto-sweeps nightly at 10:00 PM, zero fee. Cash out anytime in between.
        </Text>
        <AppButton
          label="Cash out now"
          variant="gold"
          icon="arrow-down-circle-outline"
          className="mb-[18px]"
          onPress={() => {
            if (wallet.earnings <= 0) {
              showToast("No earnings to cash out yet");
              return;
            }
            void hapticLight();
            openSheet("cashout");
          }}
        />
        <SectionTitle>Account</SectionTitle>
        <ActionItem
          icon="person-outline"
          label="Switch to passenger mode (demo)"
          onPress={() => setStage("register-rider")}
        />
        <ActionItem
          icon="log-out-outline"
          label="Log out & reset"
          danger
          onPress={() => void logout()}
        />
      </View>
    </ScrollView>
  );
}
