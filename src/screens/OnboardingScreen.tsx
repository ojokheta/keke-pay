import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { LoadingOrb } from "../components/LoadingOrb";
import { Logo } from "../components/Logo";
import { BIOMETRIC } from "../lib/api";
import { useApp } from "../store/AppProvider";

export function OnboardingScreen() {
  const { setStage } = useApp();

  return (
    <View className="flex-1 items-center justify-center px-7">
      <View className="mb-6">
        <Logo height={132} />
      </View>
      <Text className="mb-7 text-center text-sm leading-5 text-muted">
        Campus transit, digitised. Choose how you'll use it.
      </Text>
      <AppButton
        label="Continue as a passenger"
        icon="person-outline"
        onPress={() => setStage("register-rider")}
        className="mb-2.5"
      />
      <AppButton
        label="Continue as a driver"
        icon="car-outline"
        variant="ghost"
        onPress={() => setStage("register-driver")}
      />
    </View>
  );
}

export function LockScreen() {
  const { profile, justRegistered, unlock } = useApp();
  const [unlocking, setUnlocking] = useState(false);
  const greeting = profile ? `, ${profile.name.split(" ")[0]}` : "";

  return (
    <View className="flex-1 items-center justify-center px-7">
      <View className="mb-5">
        <Logo height={120} />
      </View>
      {justRegistered ? (
        <Text className="text-[23px] font-bold text-white">You're all set</Text>
      ) : null}
      <Text className={`mb-7 text-center text-sm text-muted ${justRegistered ? "mt-1.5" : ""}`}>
        {unlocking
          ? `Verifying ${BIOMETRIC.label}…`
          : `${BIOMETRIC.label} to continue${greeting}`}
      </Text>
      {unlocking ? (
        <LoadingOrb />
      ) : (
        <AppButton
          label="Unlock"
          icon="lock-open-outline"
          variant="ghost"
          full={false}
          onPress={() => {
            setUnlocking(true);
            setTimeout(unlock, 900);
          }}
          className="px-7"
        />
      )}
    </View>
  );
}

export function SectionTitle({ children }: { children: string }) {
  return (
    <Text className="mb-2.5 mt-1 text-xs font-bold uppercase tracking-wider text-faint">
      {children}
    </Text>
  );
}

export function BackRow({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-2.5 py-3.5">
      <Ionicons name="chevron-back" size={20} color="#ffffff" />
      <Text className="text-[15px] font-bold text-white">{title}</Text>
    </Pressable>
  );
}
