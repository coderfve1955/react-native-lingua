import { Lesson, LanguageCode } from "@/types/learning";

export const lessons: Lesson[] = [
  // ---------- Spanish: Greetings ----------
  {
    id: "es-greetings-1",
    unitId: "es-greetings",
    languageCode: "es",
    order: 1,
    title: "Hello & Goodbye",
    description: "Learn the most common Spanish greetings.",
    type: "audio",
    difficulty: "beginner",
    estimatedMinutes: 5,
    xpReward: 20,
    goals: [
      { id: "g1", description: "Greet someone in Spanish" },
      { id: "g2", description: "Say goodbye politely" },
    ],
    vocabulary: [
      {
        id: "es-hola",
        word: "Hola",
        translation: "Hello",
        pronunciation: "OH-lah",
        example: { text: "¡Hola, amigo!", translation: "Hello, friend!" },
      },
      {
        id: "es-adios",
        word: "Adiós",
        translation: "Goodbye",
        pronunciation: "ah-DYOHS",
      },
      {
        id: "es-buenos-dias",
        word: "Buenos días",
        translation: "Good morning",
        pronunciation: "BWEH-nohs DEE-ahs",
      },
      {
        id: "es-gracias",
        word: "Gracias",
        translation: "Thank you",
        pronunciation: "GRAH-syahs",
      },
    ],
    phrases: [
      { text: "Buenos días, ¿cómo estás?", translation: "Good morning, how are you?" },
      { text: "Adiós, hasta luego.", translation: "Goodbye, see you later." },
    ],
    activities: [
      {
        id: "a1",
        type: "multiple-choice",
        xp: 5,
        question: 'What does "Hola" mean?',
        options: ["Hello", "Goodbye", "Thank you", "Please"],
        correctAnswer: "Hello",
      },
      {
        id: "a2",
        type: "translation",
        xp: 5,
        prompt: "Thank you",
        correctAnswer: "Gracias",
      },
      {
        id: "a3",
        type: "match-pairs",
        xp: 10,
        pairs: [
          { word: "Hola", translation: "Hello" },
          { word: "Adiós", translation: "Goodbye" },
          { word: "Gracias", translation: "Thank you" },
        ],
      },
      {
        id: "a4",
        type: "speaking",
        xp: 10,
        prompt: "Buenos días",
        translation: "Good morning",
      },
    ],
    aiTeacher: {
      teacherName: "Sofía",
      systemPrompt:
        "You are Sofía, a warm and patient Spanish teacher helping a complete beginner. " +
        "Speak mostly in English, and use short Spanish words and phrases. " +
        "Keep every reply under 2 sentences. Always wait for the learner to answer before moving on.",
      openingMessage:
        "¡Hola! I'm Sofía. Today we'll learn how to say hello and goodbye in Spanish. Ready?",
      lessonFlow: [
        "Say 'Hola' slowly and ask the learner to repeat it.",
        "Teach 'Buenos días' and ask the learner to repeat it.",
        "Teach 'Gracias' and ask the learner to use it in a reply.",
        "Teach 'Adiós' and finish with a short greeting conversation.",
      ],
      correctionStyle:
        "If the learner makes a mistake, be encouraging, say the correct word once, and ask them to try again.",
      closingMessage: "¡Muy bien! You learned your first Spanish greetings. ¡Hasta luego!",
    },
  },
  {
    id: "es-greetings-2",
    unitId: "es-greetings",
    languageCode: "es",
    order: 2,
    title: "Introduce Yourself",
    description: "Say your name and ask someone else's.",
    type: "chat",
    difficulty: "beginner",
    estimatedMinutes: 6,
    xpReward: 25,
    goals: [
      { id: "g1", description: "Say your name in Spanish" },
      { id: "g2", description: "Ask someone their name" },
    ],
    vocabulary: [
      { id: "es-me-llamo", word: "Me llamo", translation: "My name is" },
      { id: "es-y-tu", word: "¿Y tú?", translation: "And you?" },
      { id: "es-mucho-gusto", word: "Mucho gusto", translation: "Nice to meet you" },
    ],
    phrases: [
      { text: "Me llamo Ana.", translation: "My name is Ana." },
      { text: "¿Cómo te llamas?", translation: "What is your name?" },
    ],
    activities: [
      {
        id: "a1",
        type: "multiple-choice",
        xp: 5,
        question: 'How do you say "Nice to meet you"?',
        options: ["Mucho gusto", "Adiós", "Gracias", "Me llamo"],
        correctAnswer: "Mucho gusto",
      },
      {
        id: "a2",
        type: "translation",
        xp: 10,
        prompt: "What is your name?",
        correctAnswer: "¿Cómo te llamas?",
        acceptedAnswers: ["Como te llamas"],
      },
    ],
    aiTeacher: {
      teacherName: "Sofía",
      systemPrompt:
        "You are Sofía, a friendly Spanish tutor chatting with a beginner. " +
        "Write short messages, mix English and simple Spanish, and always include the English translation in brackets. " +
        "Correct mistakes gently.",
      openingMessage: "¡Hola! Me llamo Sofía. ¿Cómo te llamas? (What is your name?)",
      lessonFlow: [
        "Ask the learner their name using '¿Cómo te llamas?'.",
        "Teach 'Me llamo ...' so they can answer.",
        "Respond with 'Mucho gusto' and ask '¿Y tú?' back.",
      ],
      correctionStyle:
        "Rewrite the learner's sentence correctly, explain the fix in one short line, then continue the chat.",
      closingMessage: "¡Mucho gusto! You can now introduce yourself in Spanish.",
    },
  },

  // ---------- Spanish: Food & Drink ----------
  {
    id: "es-food-1",
    unitId: "es-food",
    languageCode: "es",
    order: 1,
    title: "Common Foods",
    description: "Learn the names of everyday foods and drinks.",
    type: "vocabulary",
    difficulty: "beginner",
    estimatedMinutes: 5,
    xpReward: 20,
    goals: [
      { id: "g1", description: "Name 4 common foods and drinks" },
      { id: "g2", description: "Ask for water politely" },
    ],
    vocabulary: [
      { id: "es-agua", word: "El agua", translation: "Water", pronunciation: "el AH-gwah" },
      { id: "es-pan", word: "El pan", translation: "Bread", pronunciation: "el PAHN" },
      { id: "es-manzana", word: "La manzana", translation: "Apple", pronunciation: "lah mahn-SAH-nah" },
      { id: "es-leche", word: "La leche", translation: "Milk", pronunciation: "lah LEH-cheh" },
    ],
    phrases: [{ text: "Un agua, por favor.", translation: "A water, please." }],
    activities: [
      {
        id: "a1",
        type: "multiple-choice",
        xp: 5,
        question: 'What does "El pan" mean?',
        options: ["Bread", "Milk", "Apple", "Water"],
        correctAnswer: "Bread",
      },
      {
        id: "a2",
        type: "match-pairs",
        xp: 10,
        pairs: [
          { word: "El agua", translation: "Water" },
          { word: "La leche", translation: "Milk" },
          { word: "La manzana", translation: "Apple" },
        ],
      },
    ],
  },

  // ---------- French: Greetings ----------
  {
    id: "fr-greetings-1",
    unitId: "fr-greetings",
    languageCode: "fr",
    order: 1,
    title: "Hello & Goodbye",
    description: "Learn the most common French greetings.",
    type: "audio",
    difficulty: "beginner",
    estimatedMinutes: 5,
    xpReward: 20,
    goals: [
      { id: "g1", description: "Greet someone in French" },
      { id: "g2", description: "Say goodbye politely" },
    ],
    vocabulary: [
      { id: "fr-bonjour", word: "Bonjour", translation: "Hello", pronunciation: "bohn-ZHOOR" },
      { id: "fr-au-revoir", word: "Au revoir", translation: "Goodbye", pronunciation: "oh ruh-VWAHR" },
      { id: "fr-merci", word: "Merci", translation: "Thank you", pronunciation: "mehr-SEE" },
    ],
    phrases: [{ text: "Bonjour, ça va ?", translation: "Hello, how are you?" }],
    activities: [
      {
        id: "a1",
        type: "multiple-choice",
        xp: 5,
        question: 'What does "Bonjour" mean?',
        options: ["Hello", "Goodbye", "Thank you", "Please"],
        correctAnswer: "Hello",
      },
      {
        id: "a2",
        type: "speaking",
        xp: 10,
        prompt: "Au revoir",
        translation: "Goodbye",
      },
    ],
    aiTeacher: {
      teacherName: "Camille",
      systemPrompt:
        "You are Camille, a cheerful French teacher helping a complete beginner. " +
        "Speak mostly in English with short French words and phrases. " +
        "Keep every reply under 2 sentences and wait for the learner to answer.",
      openingMessage: "Bonjour! I'm Camille. Today we'll learn how to greet people in French.",
      lessonFlow: [
        "Say 'Bonjour' slowly and ask the learner to repeat it.",
        "Teach 'Merci' and ask the learner to use it.",
        "Teach 'Au revoir' and finish with a short greeting.",
      ],
      correctionStyle:
        "Be encouraging, say the correct word once, and ask the learner to try again.",
      closingMessage: "Très bien! Au revoir, and see you next lesson.",
    },
  },

  // ---------- Italian: Greetings ----------
  {
    id: "it-greetings-1",
    unitId: "it-greetings",
    languageCode: "it",
    order: 1,
    title: "Hello & Goodbye",
    description: "Learn the most common Italian greetings.",
    type: "audio",
    difficulty: "beginner",
    estimatedMinutes: 5,
    xpReward: 20,
    goals: [
      { id: "g1", description: "Greet someone in Italian" },
      { id: "g2", description: "Say goodbye politely" },
    ],
    vocabulary: [
      { id: "it-ciao", word: "Ciao", translation: "Hello / Bye", pronunciation: "CHOW" },
      { id: "it-arrivederci", word: "Arrivederci", translation: "Goodbye", pronunciation: "ar-ree-veh-DEHR-chee" },
      { id: "it-grazie", word: "Grazie", translation: "Thank you", pronunciation: "GRAH-tsyeh" },
    ],
    phrases: [{ text: "Ciao, come stai?", translation: "Hi, how are you?" }],
    activities: [
      {
        id: "a1",
        type: "multiple-choice",
        xp: 5,
        question: 'What does "Grazie" mean?',
        options: ["Thank you", "Hello", "Goodbye", "Please"],
        correctAnswer: "Thank you",
      },
      {
        id: "a2",
        type: "translation",
        xp: 5,
        prompt: "Goodbye",
        correctAnswer: "Arrivederci",
      },
    ],
    aiTeacher: {
      teacherName: "Marco",
      systemPrompt:
        "You are Marco, a friendly Italian teacher helping a complete beginner. " +
        "Speak mostly in English with short Italian words and phrases. " +
        "Keep every reply under 2 sentences and wait for the learner to answer.",
      openingMessage: "Ciao! I'm Marco. Today we'll learn how to say hello and goodbye in Italian.",
      lessonFlow: [
        "Say 'Ciao' and ask the learner to repeat it.",
        "Teach 'Grazie' and ask the learner to use it.",
        "Teach 'Arrivederci' and finish with a short greeting.",
      ],
      correctionStyle:
        "Be encouraging, say the correct word once, and ask the learner to try again.",
      closingMessage: "Bravo! Arrivederci, and see you next lesson.",
    },
  },
];

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonsByLanguage(code: LanguageCode): Lesson[] {
  return lessons.filter((lesson) => lesson.languageCode === code);
}
