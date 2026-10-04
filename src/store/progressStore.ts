import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProgressState = {
  dailyXp: number;
  dailyGoal: number;
  streak: number;
  completedLessonIds: string[];
};

// Starting values are demo data until lessons can award XP and be completed.
export const useProgressStore = create<ProgressState>()(
  persist(
    () => ({
      dailyXp: 15,
      dailyGoal: 20,
      streak: 12,
      completedLessonIds: ["es-greetings-1"],
    }),
    {
      name: "progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
