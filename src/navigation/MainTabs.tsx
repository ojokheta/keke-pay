import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavBar } from "../components/BottomNavBar";
import { RiderHistoryScreen } from "../screens/rider/RiderHistoryScreen";
import { RiderHomeScreen } from "../screens/rider/RiderHomeScreen";
import { RiderSettingsScreen } from "../screens/rider/RiderSettingsScreen";
import { DriverHistoryScreen } from "../screens/driver/DriverHistoryScreen";
import { DriverHomeScreen } from "../screens/driver/DriverHomeScreen";
import { DriverSettingsScreen } from "../screens/driver/DriverSettingsScreen";

export type MainTabParamList = {
  Home: undefined;
  History: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export function RiderTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNavBar {...props} />}
      screenOptions={{ headerShown: false, animation: "none" }}
    >
      <Tab.Screen name="Home">
        {({ navigation }) => (
          <RiderHomeScreen onOpenHistory={() => navigation.navigate("History")} />
        )}
      </Tab.Screen>
      <Tab.Screen name="History" component={RiderHistoryScreen} />
      <Tab.Screen name="Settings" component={RiderSettingsScreen} />
    </Tab.Navigator>
  );
}

export function DriverTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNavBar {...props} />}
      screenOptions={{ headerShown: false, animation: "none" }}
    >
      <Tab.Screen name="Home" component={DriverHomeScreen} />
      <Tab.Screen name="History" component={DriverHistoryScreen} />
      <Tab.Screen name="Settings" component={DriverSettingsScreen} />
    </Tab.Navigator>
  );
}
