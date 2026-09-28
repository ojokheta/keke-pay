import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LoadingOrb } from "../components/LoadingOrb";
import { DriverTabs, RiderTabs } from "./MainTabs";
import { LockScreen, OnboardingScreen } from "../screens/OnboardingScreen";
import { RegisterDriverScreen } from "../screens/RegisterDriverScreen";
import { RegisterRiderScreen } from "../screens/RegisterRiderScreen";
import { useApp } from "../store/AppProvider";

export function RootNavigator() {
  const { hydrated, stage, profile } = useApp();
  const insets = useSafeAreaInsets();

  if (!hydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <LoadingOrb />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black" style={{ paddingTop: insets.top }}>
      {stage === "onboarding" ? <OnboardingScreen /> : null}
      {stage === "register-rider" ? <RegisterRiderScreen /> : null}
      {stage === "register-driver" ? <RegisterDriverScreen /> : null}
      {stage === "lock" ? <LockScreen /> : null}
      {stage === "app" && profile?.role === "rider" ? <RiderTabs /> : null}
      {stage === "app" && profile?.role === "driver" ? <DriverTabs /> : null}
    </View>
  );
}
