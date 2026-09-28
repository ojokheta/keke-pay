import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton } from "../components/AppButton";
import { Field } from "../components/Field";
import { PAYOUT_BANKS, VEHICLE_TYPES } from "../constants";
import { useApp } from "../store/AppProvider";
import { BackRow } from "./OnboardingScreen";
import { SelectField } from "./RegisterRiderScreen";

export function RegisterDriverScreen() {
  const insets = useSafeAreaInsets();
  const { setStage, registerDriver } = useApp();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState<(typeof VEHICLE_TYPES)[number]>("Keke Napep");
  const [plate, setPlate] = useState("");
  const [bank, setBank] = useState<(typeof PAYOUT_BANKS)[number]>("OPay");
  const [acct, setAcct] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 26 + insets.bottom }}
        keyboardShouldPersistTaps="handled"
      >
        <BackRow title="Driver details" onPress={() => setStage("onboarding")} />
        <Text className="mb-1.5 text-left text-sm leading-5 text-muted">
          Used to generate your decal and route payouts.
        </Text>
        <Field label="Full name" value={name} onChangeText={setName} placeholder="Musa Ibrahim" />
        <Field
          label="Phone number"
          value={phone}
          onChangeText={setPhone}
          placeholder="080X XXX XXXX"
          keyboardType="phone-pad"
        />
        <SelectField
          label="Vehicle type"
          value={vehicle}
          options={VEHICLE_TYPES}
          onChange={(value) => setVehicle(value as (typeof VEHICLE_TYPES)[number])}
        />
        <Field
          label="Plate number"
          value={plate}
          onChangeText={(value) => setPlate(value.toUpperCase())}
          placeholder="e.g. XA 227 UI"
          autoCapitalize="characters"
        />
        <SelectField
          label="Payout bank"
          value={bank}
          options={PAYOUT_BANKS}
          onChange={(value) => setBank(value as (typeof PAYOUT_BANKS)[number])}
        />
        <Field
          label="Account number"
          value={acct}
          onChangeText={(value) => setAcct(value.replace(/\D/g, "").slice(0, 10))}
          placeholder="10-digit NUBAN"
          keyboardType="number-pad"
          maxLength={10}
        />
        <Field
          label="Create a 4-digit PIN"
          value={pin}
          onChangeText={(value) => setPin(value.replace(/\D/g, "").slice(0, 4))}
          placeholder="••••"
          keyboardType="number-pad"
          maxLength={4}
          secureTextEntry
        />
        {error ? (
          <Text className="mt-1.5 text-[12.5px] text-danger">Fill in every field to continue.</Text>
        ) : null}
        <AppButton
          label="Create driver account"
          variant="gold"
          className="mt-4"
          onPress={() => {
            if (!name.trim() || !phone.trim() || !plate.trim() || acct.length < 10 || pin.length < 4) {
              setError(true);
              return;
            }
            setError(false);
            void registerDriver({
              name: name.trim(),
              phone: phone.trim(),
              vehicle,
              plate: plate.trim(),
              bank,
              acct,
              pin,
            });
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
