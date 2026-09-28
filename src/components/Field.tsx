import { TextInput, View, Text, type TextInputProps } from "react-native";

interface FieldProps extends TextInputProps {
  label: string;
}

export function Field({ label, ...props }: FieldProps) {
  return (
    <View>
      <Text className="mb-1.5 mt-3.5 text-[12px] font-bold uppercase tracking-wide text-faint">
        {label}
      </Text>
      <TextInput
        placeholderTextColor="rgba(255,255,255,0.36)"
        className="w-full rounded-2xl border border-hair bg-surface px-3.5 py-[13px] text-[14.5px] font-semibold text-white"
        {...props}
      />
    </View>
  );
}
