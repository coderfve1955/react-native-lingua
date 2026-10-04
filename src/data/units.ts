import { LanguageCode, Unit } from "@/types/learning";

export const units: Unit[] = [
  // Spanish
  {
    id: "es-greetings",
    languageCode: "es",
    order: 1,
    title: "Greetings",
    description: "Say hello, goodbye and introduce yourself.",
    lessonIds: ["es-greetings-1", "es-greetings-2"],
  },
  {
    id: "es-food",
    languageCode: "es",
    order: 2,
    title: "Food & Drink",
    description: "Name common foods and order a drink.",
    lessonIds: ["es-food-1"],
  },
  // French
  {
    id: "fr-greetings",
    languageCode: "fr",
    order: 1,
    title: "Greetings",
    description: "Say hello and goodbye in French.",
    lessonIds: ["fr-greetings-1"],
  },
  // Italian
  {
    id: "it-greetings",
    languageCode: "it",
    order: 1,
    title: "Greetings",
    description: "Say hello and goodbye in Italian.",
    lessonIds: ["it-greetings-1"],
  },
  // Belgian (Flemish)
  {
    id: "be-greetings",
    languageCode: "be",
    order: 1,
    title: "Greetings",
    description: "Say hello and goodbye in Belgian Dutch.",
    lessonIds: ["be-greetings-1"],
  },
];

export function getUnitsByLanguage(code: LanguageCode): Unit[] {
  return units
    .filter((unit) => unit.languageCode === code)
    .sort((a, b) => a.order - b.order);
}

export function getUnit(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}
