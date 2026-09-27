// Mirrors the color tokens defined in src/global.css (@theme).
// Use these only where a className can't be used — see the Style Exception
// Rules in AGENTS.md (SafeAreaView, shadows, dynamic/animated styles, etc).
export const colors = {
  brand: {
    primary: "#6C4EF5",
    primaryDeep: "#5B3BF6",
    blue: "#4D8BFF",
    green: "#21C16B",
  },
  semantic: {
    success: "#21C16B",
    warning: "#FFC800",
    streak: "#FF8A00",
    error: "#FF4D4F",
    info: "#4D8BFF",
  },
  neutral: {
    textPrimary: "#0D132B",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    surface: "#F6F7FB",
    background: "#FFFFFF",
  },
} as const;
