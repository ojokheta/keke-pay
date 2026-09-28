import { PayMethodSheet } from "./PayMethodSheet";
import { TopUpSheet } from "./TopUpSheet";
import { ScanDecalSheet } from "./ScanDecalSheet";
import { DriverCodeSheet } from "./DriverCodeSheet";
import { ConfirmPaySheet } from "./ConfirmPaySheet";
import { CashOutSheet } from "./CashOutSheet";
import { PaymentConfirmationSheet } from "../PaymentConfirmationSheet";

export function SheetHost() {
  return (
    <>
      <PayMethodSheet />
      <TopUpSheet />
      <ScanDecalSheet />
      <DriverCodeSheet />
      <ConfirmPaySheet />
      <CashOutSheet />
      <PaymentConfirmationSheet />
    </>
  );
}
