import { useAuth } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity, View } from "react-native";

import { useLanguageStore } from "@/store/languageStore";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { reset } = useLanguageStore();

  const clearStorage = async () => {
    await AsyncStorage.clear();
    reset();
  };

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-white">
      <Text className="text__heading--h2">Profile</Text>
      <TouchableOpacity
        className="rounded-full bg-primary px-6 py-3"
        activeOpacity={0.85}
        onPress={() => signOut()}
      >
        <Text className="text__heading--h4 text-white">Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="rounded-full border border-border px-6 py-3"
        activeOpacity={0.85}
        onPress={clearStorage}
      >
        <Text className="text__heading--h4">Clear storage (test)</Text>
      </TouchableOpacity>
    </View>
  );
}
