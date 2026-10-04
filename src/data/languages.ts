import { Language, LanguageCode } from "@/types/learning";

export const languages: Language[] = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "https://flagcdn.com/w320/es.png",
    locale: "es-ES",
    learners: "28.4M",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "https://flagcdn.com/w320/fr.png",
    locale: "fr-FR",
    learners: "19.4M",
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "https://flagcdn.com/w320/it.png",
    locale: "it-IT",
    learners: "8.1M",
  },
  {
    code: "be",
    name: "Belgian",
    nativeName: "Vlaams",
    flag: "https://flagcdn.com/w320/be.png",
    locale: "nl-BE",
    learners: "2.1M",
  },
];

export function getLanguage(code: LanguageCode): Language | undefined {
  return languages.find((language) => language.code === code);
}
