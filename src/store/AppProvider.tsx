import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import {
  DEFAULT_WALLET,
  SEED_DRIVER_HISTORY,
  SEED_RIDER_HISTORY,
  STORAGE_KEYS,
} from "../constants";
import { generateDriverId, newId } from "../lib/format";
import type {
  AppStage,
  ConfirmationState,
  DriverProfile,
  Profile,
  RiderProfile,
  SheetName,
  TransactionHistory,
  WalletState,
} from "../types";

interface AppState {
  hydrated: boolean;
  justRegistered: boolean;
  stage: AppStage;
  profile: Profile | null;
  wallet: WalletState;
  riderHistory: TransactionHistory[];
  driverHistory: TransactionHistory[];
  activeSheet: SheetName;
  currentFare: number;
  currentDriver: string;
  confirmation: ConfirmationState | null;
  toast: string | null;
}

type Action =
  | { type: "HYDRATE"; payload: Partial<AppState> }
  | { type: "SET_STAGE"; payload: AppStage }
  | { type: "SET_PROFILE"; payload: Profile; justRegistered?: boolean }
  | { type: "SET_SHEET"; payload: SheetName }
  | { type: "SET_FARE"; payload: number }
  | { type: "SET_DRIVER"; payload: string }
  | { type: "SET_CONFIRMATION"; payload: ConfirmationState | null }
  | { type: "SHOW_TOAST"; payload: string }
  | { type: "HIDE_TOAST" }
  | { type: "TOP_UP"; payload: { amount: number } }
  | { type: "PAY_FARE"; payload: { amount: number; driverId: string } }
  | { type: "RECEIVE_FARE"; payload: { amount: number } }
  | { type: "CASH_OUT" }
  | { type: "RESET" };

const initialState: AppState = {
  hydrated: false,
  justRegistered: false,
  stage: "onboarding",
  profile: null,
  wallet: DEFAULT_WALLET,
  riderHistory: SEED_RIDER_HISTORY,
  driverHistory: SEED_DRIVER_HISTORY,
  activeSheet: null,
  currentFare: 200,
  currentDriver: "0114",
  confirmation: null,
  toast: null,
};

function prependTrip(
  list: TransactionHistory[],
  trip: Omit<TransactionHistory, "id" | "createdAt">
): TransactionHistory[] {
  return [
    {
      ...trip,
      id: newId("tx"),
      createdAt: Date.now(),
    },
    ...list,
  ];
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...action.payload, hydrated: true };
    case "SET_STAGE":
      return { ...state, stage: action.payload };
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload,
        justRegistered: action.justRegistered ?? state.justRegistered,
      };
    case "SET_SHEET":
      return { ...state, activeSheet: action.payload };
    case "SET_FARE":
      return { ...state, currentFare: action.payload };
    case "SET_DRIVER":
      return { ...state, currentDriver: action.payload };
    case "SET_CONFIRMATION":
      return { ...state, confirmation: action.payload };
    case "SHOW_TOAST":
      return { ...state, toast: action.payload };
    case "HIDE_TOAST":
      return { ...state, toast: null };
    case "TOP_UP":
      return {
        ...state,
        wallet: {
          ...state.wallet,
          balance: state.wallet.balance + action.payload.amount,
        },
      };
    case "PAY_FARE":
      return {
        ...state,
        wallet: {
          ...state.wallet,
          balance: state.wallet.balance - action.payload.amount,
        },
        riderHistory: prependTrip(state.riderHistory, {
          who: `Driver #${action.payload.driverId}`,
          when: "Just now",
          amount: action.payload.amount,
          sign: "-",
        }),
      };
    case "RECEIVE_FARE":
      return {
        ...state,
        wallet: {
          ...state.wallet,
          earnings: state.wallet.earnings + action.payload.amount,
          tripCount: state.wallet.tripCount + 1,
        },
        driverHistory: prependTrip(state.driverHistory, {
          who: `Passenger •••${Math.floor(Math.random() * 9000) + 1000}`,
          when: "Just now",
          amount: action.payload.amount,
          sign: "+",
        }),
      };
    case "CASH_OUT":
      return {
        ...state,
        wallet: { ...state.wallet, earnings: 0 },
      };
    case "RESET":
      return {
        ...initialState,
        hydrated: true,
        riderHistory: SEED_RIDER_HISTORY,
        driverHistory: SEED_DRIVER_HISTORY,
      };
    default:
      return state;
  }
}

interface AppContextValue extends AppState {
  setStage: (stage: AppStage) => void;
  openSheet: (sheet: SheetName) => void;
  closeSheets: () => void;
  setFare: (amount: number) => void;
  setDriver: (id: string) => void;
  showToast: (message: string) => void;
  registerRider: (input: Omit<RiderProfile, "role">) => Promise<void>;
  registerDriver: (input: Omit<DriverProfile, "role" | "driverId">) => Promise<void>;
  unlock: () => void;
  topUp: (amount: number, method: string) => Promise<void>;
  payFare: () => Promise<"ok" | "insufficient">;
  receiveFare: (amount: number) => void;
  cashOut: () => Promise<void>;
  dismissConfirmation: () => void;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

async function persist(state: AppState): Promise<void> {
  if (!state.hydrated) return;
  await Promise.all([
    state.profile
      ? AsyncStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(state.profile))
      : AsyncStorage.removeItem(STORAGE_KEYS.profile),
    AsyncStorage.setItem(STORAGE_KEYS.wallet, JSON.stringify(state.wallet)),
    AsyncStorage.setItem(STORAGE_KEYS.riderTx, JSON.stringify(state.riderHistory)),
    AsyncStorage.setItem(STORAGE_KEYS.driverTx, JSON.stringify(state.driverHistory)),
  ]);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [profileRaw, walletRaw, riderRaw, driverRaw] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.profile),
          AsyncStorage.getItem(STORAGE_KEYS.wallet),
          AsyncStorage.getItem(STORAGE_KEYS.riderTx),
          AsyncStorage.getItem(STORAGE_KEYS.driverTx),
        ]);

        if (cancelled) return;

        const profile = profileRaw ? (JSON.parse(profileRaw) as Profile) : null;
        dispatch({
          type: "HYDRATE",
          payload: {
            profile,
            stage: profile ? "lock" : "onboarding",
            wallet: walletRaw ? (JSON.parse(walletRaw) as WalletState) : DEFAULT_WALLET,
            riderHistory: riderRaw
              ? (JSON.parse(riderRaw) as TransactionHistory[])
              : SEED_RIDER_HISTORY,
            driverHistory: driverRaw
              ? (JSON.parse(driverRaw) as TransactionHistory[])
              : SEED_DRIVER_HISTORY,
          },
        });
      } catch {
        if (!cancelled) dispatch({ type: "HYDRATE", payload: {} });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    void persist(state);
  }, [state]);

  const showToast = useCallback((message: string) => {
    dispatch({ type: "SHOW_TOAST", payload: message });
    setTimeout(() => dispatch({ type: "HIDE_TOAST" }), 2200);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      setStage: (stage) => dispatch({ type: "SET_STAGE", payload: stage }),
      openSheet: (sheet) => dispatch({ type: "SET_SHEET", payload: sheet }),
      closeSheets: () => dispatch({ type: "SET_SHEET", payload: null }),
      setFare: (amount) => dispatch({ type: "SET_FARE", payload: amount }),
      setDriver: (id) => dispatch({ type: "SET_DRIVER", payload: id }),
      showToast,
      registerRider: async (input) => {
        const profile: RiderProfile = { role: "rider", ...input };
        dispatch({ type: "SET_PROFILE", payload: profile, justRegistered: true });
        dispatch({ type: "SET_STAGE", payload: "lock" });
      },
      registerDriver: async (input) => {
        const profile: DriverProfile = {
          role: "driver",
          ...input,
          driverId: generateDriverId(),
        };
        dispatch({ type: "SET_PROFILE", payload: profile, justRegistered: true });
        dispatch({ type: "SET_STAGE", payload: "lock" });
      },
      unlock: () => dispatch({ type: "SET_STAGE", payload: "app" }),
      topUp: async (amount) => {
        dispatch({ type: "TOP_UP", payload: { amount } });
        dispatch({ type: "SET_SHEET", payload: null });
      },
      payFare: async () => {
        if (state.wallet.balance < state.currentFare) return "insufficient";
        dispatch({
          type: "PAY_FARE",
          payload: { amount: state.currentFare, driverId: state.currentDriver },
        });
        dispatch({
          type: "SET_CONFIRMATION",
          payload: {
            amount: state.currentFare,
            message: "Paid — safe trip",
            variant: "paid",
            doneLabel: "Done",
          },
        });
        dispatch({ type: "SET_SHEET", payload: "confirmation" });
        return "ok";
      },
      receiveFare: (amount) => {
        dispatch({ type: "RECEIVE_FARE", payload: { amount } });
        dispatch({
          type: "SET_CONFIRMATION",
          payload: {
            amount,
            message: "Received",
            variant: "received",
            doneLabel: "Back to waiting",
          },
        });
        dispatch({ type: "SET_SHEET", payload: "confirmation" });
      },
      cashOut: async () => {
        const amount = state.wallet.earnings;
        dispatch({ type: "CASH_OUT" });
        dispatch({
          type: "SET_CONFIRMATION",
          payload: {
            amount,
            message: "Cashed out",
            variant: "cashed_out",
            doneLabel: "Done",
          },
        });
        dispatch({ type: "SET_SHEET", payload: "confirmation" });
      },
      dismissConfirmation: () => {
        dispatch({ type: "SET_CONFIRMATION", payload: null });
        dispatch({ type: "SET_SHEET", payload: null });
      },
      logout: async () => {
        await AsyncStorage.multiRemove([
          STORAGE_KEYS.profile,
          STORAGE_KEYS.wallet,
          STORAGE_KEYS.riderTx,
          STORAGE_KEYS.driverTx,
        ]);
        dispatch({ type: "RESET" });
      },
    }),
    [showToast, state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
