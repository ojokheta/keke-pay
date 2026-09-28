import { useEffect, type RefObject } from "react";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { SheetName } from "../types";

export function useControlledSheet(
  ref: RefObject<BottomSheetModal | null>,
  name: Exclude<SheetName, null>,
  activeSheet: SheetName
): void {
  useEffect(() => {
    if (activeSheet === name) {
      const id = setTimeout(() => ref.current?.present(), 80);
      return () => clearTimeout(id);
    }
    ref.current?.dismiss();
  }, [activeSheet, name, ref]);
}
