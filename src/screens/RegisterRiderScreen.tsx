import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton } from "../components/AppButton";
import { Field } from "../components/Field";
import { useApp } from "../store/AppProvider";
import { BackRow } from "./OnboardingScreen";

export function RegisterRiderScreen() {
  const insets = useSafeAreaInsets();
  const { setStage, registerRider } = useApp();
  const [name, setName] = useState("");
  const [matric, setMatric] = useState("");
  const [phone, setPhone] = useState("");
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
        <BackRow title="Passenger details" onPress={() => setStage("onboarding")} />
        <Text className="mb-1.5 text-left text-sm leading-5 text-muted">
          This funds your student wallet and links trips to you.
        </Text>
        <Field label="Full name" value={name} onChangeText={setName} placeholder="Adaeze Okonkwo" />
        <Field
          label="Matric number"
          value={matric}
          onChangeText={setMatric}
          placeholder="e.g. 2323233"
          keyboardType="number-pad"
        />
        <Field
          label="Phone number"
          value={phone}
          onChangeText={setPhone}
          placeholder="080X XXX XXXX"
          keyboardType="phone-pad"
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
          label="Create passenger account"
          className="mt-4"
          onPress={() => {
            if (!name.trim() || !matric.trim() || !phone.trim() || pin.length < 4) {
              setError(true);
              return;
            }
            setError(false);
            void registerRider({
              name: name.trim(),
              matric: matric.trim(),
              phone: phone.trim(),
              pin,
            });
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

export function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <View>
      <Text className="mb-1.5 mt-3.5 text-[12px] font-bold uppercase tracking-wide text-faint">
        {label}
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => {
          const selected = option === value;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              className={`rounded-2xl border px-3 py-2.5 ${
                selected ? "border-accent bg-surface" : "border-hair bg-surface"
              }`}
            >
              <Text className="text-[13px] font-semibold text-white">{option}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
