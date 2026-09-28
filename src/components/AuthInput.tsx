import { useState } from "react";
import { KeyboardTypeOptions, Pressable, Text, TextInput, View } from "react-native";

import { EyeIcon, EyeOffIcon } from "@/components/icons";
import { colors } from "@/theme";

type AuthInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

export function AuthInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize = "none",
}: AuthInputProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const isPassword = !!secureTextEntry;

  return (
    <View className="flex-row items-center rounded-2xl border border-border bg-white px-4 py-2.5">
      <View className="flex-1">
        <Text className="text__caption">{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral.textSecondary}
          secureTextEntry={isPassword && !isRevealed}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          className="text__body--lg p-0"
        />
      </View>

      {isPassword && (
        <Pressable hitSlop={12} onPress={() => setIsRevealed((prev) => !prev)}>
          {isRevealed ? <EyeOffIcon /> : <EyeIcon />}
        </Pressable>
      )}
    </View>
  );
}
