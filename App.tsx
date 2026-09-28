import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SheetHost } from "./src/components/sheets/SheetHost";
import { Toast } from "./src/components/Toast";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { AppProvider, useApp } from "./src/store/AppProvider";

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#000000",
    card: "#121212",
    text: "#ffffff",
    border: "rgba(255,255,255,0.10)",
    primary: "#2ee881",
  },
};

function AppShell() {
  const { toast } = useApp();

  return (
    <BottomSheetModalProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="light" />
        <RootNavigator />
        <SheetHost />
        <Toast message={toast} />
      </NavigationContainer>
    </BottomSheetModalProvider>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#000000" }}>
      <SafeAreaProvider>
        <AppProvider>
          <AppShell />
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
