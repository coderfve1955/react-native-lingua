import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";

import { colors } from "@/theme";

type GradientButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
};

export function GradientButton({ label, onPress, disabled }: GradientButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} disabled={disabled}>
      <LinearGradient
        colors={[colors.brand.primary, colors.brand.primaryDeep]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 16, paddingVertical: 16, alignItems: "center", opacity: disabled ? 0.6 : 1 }}
      >
        <Text className="text__heading--h4 text-white">{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
