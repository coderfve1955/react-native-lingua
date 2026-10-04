import { useUser } from "@clerk/expo";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  BellIcon,
  BookIcon,
  HeadphonesIcon,
  VideoIcon,
  WordsIcon,
} from "@/components/icons";
import { PlanItem } from "@/components/PlanItem";
import { images } from "@/constants/images";
import { getLanguage } from "@/data/languages";
import { getLessonsByLanguage } from "@/data/lessons";
import { getUnit } from "@/data/units";
import { useLanguageStore } from "@/store/languageStore";
import { useProgressStore } from "@/store/progressStore";
import { colors } from "@/theme";

export default function HomeScreen() {
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const { dailyXp, dailyGoal, streak, completedLessonIds } = useProgressStore();

  const language = selectedLanguage ? getLanguage(selectedLanguage) : undefined;
  if (!language) return null;

  const name =
    user?.firstName ?? user?.username ?? user?.primaryEmailAddress?.emailAddress.split("@")[0] ?? "there";

  const lessons = getLessonsByLanguage(language.code);
  const isDone = (id: string) => completedLessonIds.includes(id);

  // Lesson to continue = first one not completed yet (or the first one if all are done)
  const currentLesson = lessons.find((lesson) => !isDone(lesson.id)) ?? lessons[0];
  const unit = currentLesson ? getUnit(currentLesson.unitId) : undefined;
  const level = currentLesson?.difficulty === "beginner" ? "A1" : "B1";

  // Today's plan, built from the lesson data
  const planLesson = lessons[0];
  const conversationLesson = lessons.find((lesson) => lesson.type === "chat") ?? planLesson;
  const wordCount = currentLesson?.vocabulary.length ?? 0;

  const goalProgress = Math.min(dailyXp / dailyGoal, 1);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-5 px-5 pt-4">
          {/* Header */}
          <View className="flex-row items-center">
            <Image source={{ uri: language.flag }} className="h-10 w-10 rounded-full" resizeMode="cover" />
            <Text className="text__heading--h4 ml-3 flex-1" numberOfLines={1}>
              {language.greeting}, {name}! 👋
            </Text>
            <Image source={images.streakFire} className="h-8 w-8" resizeMode="contain" />
            <Text className="text__heading--h4 ml-1 mr-4 text-text-primary">{streak}</Text>
            <TouchableOpacity activeOpacity={0.7} accessibilityLabel="Notifications">
              <BellIcon size={28} />
            </TouchableOpacity>
          </View>

          {/* Daily goal */}
          <View className="h-[116px] flex-row items-center overflow-hidden rounded-3xl bg-[#FFF4EA] pl-5 pr-3">
            <View className="flex-1">
              <Text className="text__body--lg text-text-primary">Daily goal</Text>
              <View className="mt-1 flex-row items-end">
                <Text className="text__heading--h1">{dailyXp}</Text>
                <Text className="text__body--lg mb-1 ml-1 text-text-secondary">/ {dailyGoal} XP</Text>
              </View>
              <View className="mt-2 h-2 w-[90%] overflow-hidden rounded-full bg-[#FBE6D2]">
                <View
                  className="h-full rounded-full bg-[#F59A3B]"
                  style={{ width: `${goalProgress * 100}%` }}
                />
              </View>
            </View>
            <Image source={images.treasure} className="h-[100px] w-[100px]" resizeMode="contain" />
          </View>

          {/* Continue learning */}
          <LinearGradient
            colors={[colors.brand.primaryDeep, "#7B63FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 24, height: 161, padding: 20, overflow: "hidden" }}
          >
            <Image
              source={images.palace}
              className="absolute -bottom-4 right-2 h-[170px] w-[170px]"
              resizeMode="contain"
            />
            <Text className="text__body--lg text-white">Continue learning</Text>
            <Text className="text__heading--h2 mt-1 text-white">{language.name}</Text>
            <Text className="text__body--lg text-white">
              {level} • Unit {unit?.order ?? 1}
            </Text>
            <TouchableOpacity
              className="mt-3 self-start rounded-full bg-white px-6 py-2.5"
              activeOpacity={0.85}
            >
              <Text className="text__heading--h4 text-primary">Continue</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Today's plan */}
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text className="text__heading--h3">Today’s plan</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="text__heading--h4 text-primary">View all</Text>
              </TouchableOpacity>
            </View>

            {planLesson && (
              <PlanItem
                icon={<BookIcon color="#FFFFFF" />}
                iconBackground={colors.brand.primary}
                title="Lesson"
                subtitle={planLesson.title}
                done={isDone(planLesson.id)}
              />
            )}
            {conversationLesson && (
              <PlanItem
                icon={<HeadphonesIcon color="#FFFFFF" />}
                iconBackground={colors.brand.primary}
                title="AI Conversation"
                subtitle={conversationLesson.title}
                done={isDone(conversationLesson.id) && conversationLesson.id !== planLesson?.id}
              />
            )}
            <PlanItem
              icon={<WordsIcon color="#FFFFFF" />}
              iconBackground="#EF6B6B"
              title="New words"
              subtitle={`${wordCount} words`}
              done={false}
            />
          </View>

          {/* Next up */}
          <View className="h-[105px] flex-row items-center overflow-hidden rounded-3xl bg-[#F1F8E9] pl-5 pr-4">
            <View className="flex-1">
              <Text className="text__body--md text-text-secondary">Next up</Text>
              <Text className="text__heading--h3">AI Video Call</Text>
              <Text className="text__body--md text-text-secondary">Practice speaking</Text>
            </View>
            <Image source={images.teacher} className="h-[80px] w-[80px] rounded-full" resizeMode="cover" />
            <TouchableOpacity
              className="ml-3 h-12 w-12 items-center justify-center rounded-full bg-green"
              activeOpacity={0.85}
              accessibilityLabel="Start video call"
            >
              <VideoIcon color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
