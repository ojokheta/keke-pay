import { ScrollView, View } from "react-native";
import { ActionItem } from "../../components/ActionItem";
import { BrandBar } from "../../components/Header";
import { ProfileCard } from "../../components/ProfileCard";
import { useApp } from "../../store/AppProvider";
import { SectionTitle } from "../OnboardingScreen";

export function RiderSettingsScreen() {
  const { profile, setStage, logout } = useApp();
  const name = profile?.role === "rider" ? profile.name : "Passenger";
  const matric = profile?.role === "rider" ? profile.matric : "••••";

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 26 }}
      showsVerticalScrollIndicator={false}
    >
      <BrandBar badge="PASSENGER" />
      <View className="px-5">
        <ProfileCard
          name={name}
          subtitle={`Matric ${matric} · UI Campus`}
          icon="person-outline"
        />
        <SectionTitle>Account</SectionTitle>
        <ActionItem
          icon="car-outline"
          label="Switch to driver mode (demo)"
          onPress={() => setStage("register-driver")}
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
