export type UserRole = "rider" | "driver";

export type AppStage =
  | "onboarding"
  | "register-rider"
  | "register-driver"
  | "lock"
  | "app";

export interface RiderProfile {
  role: "rider";
  name: string;
  matric: string;
  phone: string;
  pin: string;
}

export interface DriverProfile {
  role: "driver";
  name: string;
  phone: string;
  vehicle: string;
  plate: string;
  bank: string;
  acct: string;
  pin: string;
  driverId: string;
}

export type Profile = RiderProfile | DriverProfile;

export interface FareOption {
  id: string;
  amount: number | null;
  label: string;
}

export interface TransactionHistory {
  id: string;
  who: string;
  when: string;
  amount: number;
  sign: "+" | "-";
  createdAt: number;
}

export interface WalletState {
  balance: number;
  earnings: number;
  tripCount: number;
}

export type SheetName =
  | "method"
  | "topup"
  | "scan"
  | "code"
  | "pay"
  | "cashout"
  | "confirmation"
  | null;

export type ConfirmationVariant = "paid" | "received" | "cashed_out";

export interface ConfirmationState {
  amount: number;
  message: string;
  variant: ConfirmationVariant;
  doneLabel: string;
}

export type TopUpMethod = "Card" | "Bank transfer" | "USSD";
