import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { isLoaded, isSignedIn, signOut } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-white">
      <Text className="text__heading--h1">Lingua</Text>
      <TouchableOpacity
        className="rounded-full bg-primary px-6 py-3"
        activeOpacity={0.85}
        onPress={() => signOut()}
      >
        <Text className="text__heading--h4 text-white">Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
