import type { FareOption, TransactionHistory } from "../types";

export const FARE_OPTIONS: FareOption[] = [
  { id: "100", amount: 100, label: "Short hop" },
  { id: "200", amount: 200, label: "Standard" },
  { id: "300", amount: 300, label: "Hall run" },
  { id: "500", amount: 500, label: "Cab share" },
  { id: "600", amount: 600, label: "Full cab" },
  { id: "other", amount: null, label: "Other" },
];

export const TOPUP_AMOUNTS = [500, 1000, 2000] as const;

export const VEHICLE_TYPES = ["Keke Napep", "Shared cab"] as const;

export const PAYOUT_BANKS = [
  "OPay",
  "Kuda",
  "Moniepoint",
  "Zenith",
  "FirstBank",
] as const;

export const DEFAULT_WALLET = {
  balance: 1450,
  earnings: 3400,
  tripCount: 18,
};

export const SEED_RIDER_HISTORY: TransactionHistory[] = [
  {
    id: "r1",
    who: "Keke #4213",
    when: "Today, 7:52 AM · Sub → CBN",
    amount: 200,
    sign: "-",
    createdAt: 3,
  },
  {
    id: "r2",
    who: "Keke #0871",
    when: "Yesterday, 5:10 PM · Tech → Zik",
    amount: 100,
    sign: "-",
    createdAt: 2,
  },
  {
    id: "r3",
    who: "Cab #0022",
    when: "Yesterday, 8:01 AM · Awo → Fac. of Arts",
    amount: 600,
    sign: "-",
    createdAt: 1,
  },
];

export const SEED_DRIVER_HISTORY: TransactionHistory[] = [
  {
    id: "d1",
    who: "Passenger •••4213",
    when: "Today, 7:52 AM",
    amount: 200,
    sign: "+",
    createdAt: 3,
  },
  {
    id: "d2",
    who: "Passenger •••0871",
    when: "Today, 6:40 AM",
    amount: 100,
    sign: "+",
    createdAt: 2,
  },
  {
    id: "d3",
    who: "Passenger •••0022",
    when: "Yesterday, 8:01 PM",
    amount: 600,
    sign: "+",
    createdAt: 1,
  },
];

export const STORAGE_KEYS = {
  profile: "kekepays_profile",
  wallet: "kekepays_wallet",
  riderTx: "kekepays_rider_tx",
  driverTx: "kekepays_driver_tx",
} as const;
