import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type SocialAuthButtonProps = {
  icon: ReactNode;
  label: string;
  onPress?: () => void;
};

export function SocialAuthButton({ icon, label, onPress }: SocialAuthButtonProps) {
  return (
    <TouchableOpacity
      className="relative flex-row items-center justify-center rounded-2xl border border-border bg-white py-4"
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View className="absolute left-5">{icon}</View>
      <Text className="text__heading--h4">{label}</Text>
    </TouchableOpacity>
  );
}
