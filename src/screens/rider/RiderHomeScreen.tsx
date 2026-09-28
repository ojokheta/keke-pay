import { ScrollView, Text, View } from "react-native";
import { Header } from "../../components/Header";
import { QuickFareGrid } from "../../components/QuickFareGrid";
import { hapticLight } from "../../lib/haptics";
import { useApp } from "../../store/AppProvider";
import type { FareOption } from "../../types";

interface RiderHomeScreenProps {
  onOpenHistory: () => void;
}

export function RiderHomeScreen({ onOpenHistory }: RiderHomeScreenProps) {
  const { profile, wallet, setFare, openSheet, currentFare } = useApp();
  const matric = profile?.role === "rider" ? profile.matric : "2323233";

  const onSelectFare = (option: FareOption) => {
    void hapticLight();
    setFare(option.amount ?? 200);
    openSheet("method");
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 26 }}
      showsVerticalScrollIndicator={false}
    >
      <Header
        badge="PASSENGER"
        subtitle="KEKEPAYS · UI CAMPUS"
        amountLabel="Wallet balance"
        amount={wallet.balance}
        footLeft={`Matric ${matric}`}
        footRight="Student wallet"
        onTopUp={() => {
          void hapticLight();
          openSheet("topup");
        }}
        onHistory={onOpenHistory}
      />
      <View className="px-5">
        <QuickFareGrid selectedAmount={currentFare} onSelect={onSelectFare} />
        <Text className="text-center text-[11.5px] text-faint">
          Fares debit your student wallet instantly.
        </Text>
      </View>
    </ScrollView>
  );
}
