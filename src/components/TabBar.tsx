import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RobotIcon, BookIcon, ChatIcon, HomeIcon, UserIcon } from "@/components/icons";
import { colors } from "@/theme";

// Expo Router doesn't re-export BottomTabBarProps, so derive it from <Tabs>.
type TabBarProps = Parameters<NonNullable<React.ComponentProps<typeof Tabs>["tabBar"]>>[0];

const CIRCLE_SIZE = 56;

const tabIcons: Record<string, typeof HomeIcon> = {
  index: HomeIcon,
  learn: BookIcon,
  "ai-teacher": RobotIcon,
  chat: ChatIcon,
  profile: UserIcon,
};

export default function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const tabWidth = barWidth / state.routes.length;

  // The circle slides to the center of the active tab at a steady, linear pace.
  const circleX = useSharedValue(0);

  useEffect(() => {
    circleX.value = withTiming(state.index * tabWidth + (tabWidth - CIRCLE_SIZE) / 2, {
      duration: 250,
      easing: Easing.linear,
    });
  }, [state.index, tabWidth, circleX]);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: circleX.value }],
  }));

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.bar} onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}>
        {barWidth > 0 && <Animated.View style={[styles.circle, circleStyle]} />}

        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const label = descriptors[route.key].options.title ?? route.name;
          const Icon = tabIcons[route.name];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={label}
              activeOpacity={0.8}
              onPress={onPress}
              style={styles.tab}
            >
              <Icon size={26} color={isFocused ? "#FFFFFF" : colors.neutral.textSecondary} />
              {!isFocused && (
                <Text className="text__caption" numberOfLines={1}>
                  {label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.neutral.background,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  bar: {
    flexDirection: "row",
    height: 72,
    borderRadius: 28,
    backgroundColor: colors.neutral.background,
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: { elevation: 8 },
    }),
  },
  circle: {
    position: "absolute",
    top: (72 - CIRCLE_SIZE) / 2,
    left: 0,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.brand.primary,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
});
