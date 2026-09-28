import { cssInterop } from "nativewind";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";

cssInterop(BottomSheetView, { className: "style" });
cssInterop(BottomSheetTextInput, { className: "style" });
cssInterop(LinearGradient, { className: "style" });
