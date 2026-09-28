import { ScrollView, View } from "react-native";
import { BrandBar } from "../../components/Header";
import { TripRow } from "../../components/TripRow";
import { useApp } from "../../store/AppProvider";
import { SectionTitle } from "../OnboardingScreen";

export function RiderHistoryScreen() {
  const { riderHistory } = useApp();

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 26 }}
      showsVerticalScrollIndicator={false}
    >
      <BrandBar badge="PASSENGER" />
      <View className="px-5">
        <SectionTitle>Transactions</SectionTitle>
        {riderHistory.map((trip) => (
          <TripRow key={trip.id} trip={trip} />
        ))}
      </View>
    </ScrollView>
  );
}
