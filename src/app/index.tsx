import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-white">
      <Text className="text__heading--h1">Lingua</Text>
      <Link href="/onboarding" className="rounded-full bg-primary px-6 py-3">
        <Text className="text__heading--h4 text-white">Get Started</Text>
      </Link>
    </View>
  );
}
