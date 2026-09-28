import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hapticLight } from "../lib/haptics";

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Home: "home",
  History: "receipt-outline",
  Settings: "settings-outline",
};

export function BottomNavBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row border-t border-hair bg-surface/90 px-2 pt-2.5"
      style={{ paddingBottom: Math.max(insets.bottom, 10) }}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const color = focused ? "#2ee881" : "rgba(255,255,255,0.36)";
        const icon = ICONS[route.name] ?? "ellipse-outline";

        return (
          <Pressable
            key={route.key}
            onPress={() => {
              void hapticLight();
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
            className="flex-1 items-center gap-[3px]"
          >
            <Ionicons name={icon} size={21} color={color} />
            <Text
              className={`text-[10.5px] font-semibold ${focused ? "text-accent" : "text-faint"}`}
            >
              {route.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
