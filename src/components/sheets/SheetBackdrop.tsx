import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";

export function SheetBackdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.72}
      pressBehavior="close"
    >
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <BlurView intensity={18} tint="dark" style={StyleSheet.absoluteFill} />
      </View>
    </BottomSheetBackdrop>
  );
}
