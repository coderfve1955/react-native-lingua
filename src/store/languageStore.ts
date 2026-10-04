import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { LanguageCode } from "@/types/learning";

type LanguageState = {
  selectedLanguage: LanguageCode | null;
  // true once the saved value has been read from AsyncStorage
  hasHydrated: boolean;
  setSelectedLanguage: (code: LanguageCode) => void;
  reset: () => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      hasHydrated: false,
      setSelectedLanguage: (code) => set({ selectedLanguage: code }),
      reset: () => set({ selectedLanguage: null }),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ selectedLanguage: state.selectedLanguage }),
      onRehydrateStorage: () => () => {
        useLanguageStore.setState({ hasHydrated: true });
      },
    },
  ),
);
