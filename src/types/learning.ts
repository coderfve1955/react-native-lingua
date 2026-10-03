export type LanguageCode = "es" | "fr" | "it";

export type LessonType = "video" | "audio" | "chat" | "vocabulary" | "practice";

export type Difficulty = "beginner" | "intermediate";

export type Language = {
  code: LanguageCode;
  name: string; // English name, e.g. "Spanish"
  nativeName: string; // e.g. "Español"
  flag: string; // emoji flag
  // BCP-47 locale, useful later for speech / TTS, e.g. "es-ES"
  locale: string;
};

export type Unit = {
  id: string;
  languageCode: LanguageCode;
  order: number;
  title: string;
  description: string;
  lessonIds: string[]; // in the order they should be taken
};

export type VocabularyItem = {
  id: string;
  word: string; // in the target language
  translation: string; // in English
  pronunciation?: string; // simple hint, e.g. "OH-lah"
  example?: Phrase;
};

export type Phrase = {
  text: string; // in the target language
  translation: string; // in English
};

export type LessonGoal = {
  id: string;
  description: string; // e.g. "Greet someone in Spanish"
};

// ---- Activities ----
// Each activity has a `type`, so TypeScript can narrow it in a switch statement.

type ActivityBase = {
  id: string;
  xp: number;
};

export type MultipleChoiceActivity = ActivityBase & {
  type: "multiple-choice";
  question: string;
  options: string[];
  correctAnswer: string;
};

export type TranslationActivity = ActivityBase & {
  type: "translation";
  prompt: string; // text to translate
  correctAnswer: string;
  acceptedAnswers?: string[]; // other valid answers
};

export type MatchPairsActivity = ActivityBase & {
  type: "match-pairs";
  pairs: { word: string; translation: string }[];
};

export type SpeakingActivity = ActivityBase & {
  type: "speaking";
  prompt: string; // what the learner should say, in the target language
  translation: string;
};

export type Activity =
  | MultipleChoiceActivity
  | TranslationActivity
  | MatchPairsActivity
  | SpeakingActivity;

// ---- AI teacher ----
// Prompts used later by the Vision Agent (audio / video) and the chat tutor.
// They are plain strings, so the backend can send them as-is.

export type AITeacherPrompt = {
  teacherName: string;
  // Sets the personality and rules of the teacher
  systemPrompt: string;
  // First thing the teacher says when the lesson starts
  openingMessage: string;
  // Steps the teacher should follow, in order
  lessonFlow: string[];
  // What the teacher says when the learner makes a mistake
  correctionStyle: string;
  // What the teacher says at the end
  closingMessage: string;
};

export type Lesson = {
  id: string;
  unitId: string;
  languageCode: LanguageCode;
  order: number;
  title: string;
  description: string;
  type: LessonType;
  difficulty: Difficulty;
  estimatedMinutes: number;
  xpReward: number;
  goals: LessonGoal[];
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: Activity[];
  // Only needed for lessons taught by the AI (audio / video / chat)
  aiTeacher?: AITeacherPrompt;
};
