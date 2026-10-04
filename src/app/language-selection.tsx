import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GradientButton } from "@/components/GradientButton";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@/components/icons";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { colors } from "@/theme";
import { LanguageCode } from "@/types/learning";

export default function LanguageSelection() {
  const [selected, setSelected] = useState<LanguageCode>("es");
  const [query, setQuery] = useState("");

  const visibleLanguages = languages.filter((language) =>
    language.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.neutral.background }}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-6">
          <View className="h-12 flex-row items-center justify-center pt-2">
            <TouchableOpacity
              className="absolute left-0 h-10 w-10 justify-center"
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <ChevronLeftIcon />
            </TouchableOpacity>
            <Text className="text__heading--h3">Choose a language</Text>
          </View>

          <View className="mt-4 h-14 flex-row items-center gap-3 rounded-full border border-border bg-surface px-5">
            <SearchIcon />
            <TextInput
              style={{
                flex: 1,
                fontFamily: "Poppins-Regular",
                fontSize: 16,
                color: colors.neutral.textPrimary,
              }}
              placeholder="Search languages"
              placeholderTextColor={colors.neutral.textSecondary}
              value={query}
              onChangeText={setQuery}
            />
          </View>

          <Text className="text__heading--h4 pb-3 pt-6">Popular</Text>

          <View className="gap-3">
            {visibleLanguages.map((language) => {
              const isSelected = language.code === selected;
              return (
                <TouchableOpacity
                  key={language.code}
                  className={
                    isSelected
                      ? "language-card language-card--selected"
                      : "language-card"
                  }
                  activeOpacity={0.85}
                  onPress={() => setSelected(language.code)}
                >
                  <Image
                    source={{ uri: language.flag }}
                    className="h-12 w-12 rounded-full"
                    resizeMode="cover"
                  />
                  <View className="flex-1">
                    <Text className="text__heading--h4">{language.name}</Text>
                    <Text className="text__body--sm">
                      {language.learners} learners
                    </Text>
                  </View>
                  {isSelected ? <CheckCircleIcon /> : <ChevronRightIcon />}
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="mt-5">
            <GradientButton label="Confirm" onPress={() => router.back()} />
          </View>
        </View>
      </ScrollView>

      {/* earth.png is square with empty space above/below the artwork; the wrapper crops it to the globe */}
      <View className="h-40 items-center overflow-hidden">
        <Image
          source={images.earth}
          className="-mt-[41px] h-[242px] w-[242px]"
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}
