import { Platform } from "react-native";

export const BIOMETRIC =
  Platform.OS === "ios"
    ? { label: "Face ID", icon: "scan" as const }
    : { label: "Fingerprint", icon: "finger-print" as const };

type ChargeInput = { amount: number; method: string };
type PayFareInput = { amount: number; driverId: string };
type WithdrawInput = { amount: number; bank: string };

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const KekePaysAPI = {
  async charge({ amount, method }: ChargeInput) {
    await wait(500);
    return {
      status: "success" as const,
      reference: `KP-${Date.now()}`,
      amount,
      method,
    };
  },

  async payFare({ amount, driverId }: PayFareInput) {
    await wait(450);
    return {
      status: "success" as const,
      reference: `FARE-${Date.now()}`,
      amount,
      driverId,
    };
  },

  async withdraw({ amount, bank }: WithdrawInput) {
    await wait(600);
    return {
      status: "success" as const,
      reference: `WD-${Date.now()}`,
      amount,
      bank,
    };
  },
};
