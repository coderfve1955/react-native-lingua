import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";

export default function Onboarding() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-center gap-2 pt-4">
          <Image source={images.mascotLogo} className="h-9 w-9" resizeMode="contain" />
          <Text className="text__heading--h2">lingua</Text>
        </View>

        <View className="pt-10">
          <Text className="text__heading--h1">
            Your AI language{"\n"}
            <Text className="text-primary">teacher.</Text>
          </Text>
          <Text className="text__body--sm pt-3">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>
        </View>

        <View className="flex-1 items-center justify-center py-6">
          {/* max-height keeps the illustration from overpowering short/landscape viewports */}
          <View className="relative aspect-square w-full max-h-[420px] items-center justify-end">
            <View className="absolute left-[4%] top-[2%] rounded-2xl rounded-bl-md bg-blue-50 px-4 py-2">
              <Text className="text__body--md">Hello!</Text>
            </View>
            <View className="absolute right-[6%] top-[2%] rounded-2xl rounded-br-md bg-primary/10 px-4 py-2">
              <Text className="text__body--md text-primary">¡Hola!</Text>
            </View>
            <View className="absolute right-0 top-[26%] rounded-2xl rounded-br-md bg-error/10 px-4 py-2">
              <Text className="text__body--md text-error">你好!</Text>
            </View>

            <Image
              source={images.mascotWelcome}
              className="h-[85%] w-full"
              resizeMode="contain"
            />
          </View>
        </View>

        <TouchableOpacity
          className="mb-6 flex-row items-center justify-center gap-2 rounded-full bg-primary py-4"
          activeOpacity={0.85}
          onPress={() => router.push("/sign-up")}
        >
          <Text className="text__heading--h4 text-white">Get Started</Text>
          <Text className="text-lg font-bold text-white">›</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
