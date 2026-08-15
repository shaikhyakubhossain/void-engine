export type GreetingPeriod =
  | "morning"
  | "afternoon"
  | "evening"
  | "night";

export const GREETINGS: Record<GreetingPeriod, readonly string[]> = {
  morning: [
    "Good morning",
    "Morning",
    "Hey, good morning",
  ],
  afternoon: [
    "Good afternoon",
    "Afternoon",
    "Hey, good afternoon",
  ],
  evening: [
    "Good evening",
    "Evening",
    "Hey, good evening",
  ],
  night: [
    "Still up",
    "Late night",
    "Up late",
    "Working late",
  ],
};

export const POSTFIX_MESSAGES = [
  "What can I help you with today?",
  "What are we working on today?",
  "What can we work on together?",
  "What are you working on?",
  "What can we build today?",
  "What would you like to work on?",
  "Need a hand with something?",
  "What can I help you figure out?",
  "What are you thinking about?",
  "What shall we work on?",
  "Ready when you are.",
  "I'm ready when you are.",
  "What can we tackle today?",
  "What's on your mind?",
  "What would you like to explore?",
] as const;