import { ReactNode } from "react";
import { Text, View } from "react-native";

type PlanItemProps = {
  icon: ReactNode;
  iconBackground: string;
  title: string;
  subtitle: string;
  done: boolean;
};

export function PlanItem({ icon, iconBackground, title, subtitle, done }: PlanItemProps) {
  return (
    <View className="flex-row items-center gap-4">
      <View
        className="h-12 w-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: iconBackground }}
      >
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text__heading--h4" numberOfLines={1}>
          {title}
        </Text>
        <Text className="text__body--md text-text-secondary" numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      {done ? (
        <View className="h-8 w-8 items-center justify-center rounded-full bg-primary">
          <Text className="text-base text-white">✓</Text>
        </View>
      ) : (
        <View className="h-8 w-8 rounded-full border-2 border-text-secondary/60" />
      )}
    </View>
  );
}
