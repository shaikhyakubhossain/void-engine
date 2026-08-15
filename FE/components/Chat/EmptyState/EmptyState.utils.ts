import { GreetingPeriod, GREETINGS, POSTFIX_MESSAGES } from "./EmptyState.constants";

export function getGreetingPeriod(
  date = new Date()
): GreetingPeriod {
  const hour = date.getHours();

  if (hour < 5) return "night";
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  if (hour < 22) return "evening";

  return "night";
}

export function getGreeting(date = new Date()): string {
  const period = getGreetingPeriod(date);
  const greetings = GREETINGS[period];

  return greetings[Math.floor(Math.random() * greetings.length)];
}

export function getPersonalizedGreeting(
  userName?: string,
  date = new Date()
): string {
  const greeting = getGreeting(date);

  return userName
    ? `${greeting}, ${userName}.`
    : `${greeting}.`;
}

export function getRandomPostfix(): string {
  return POSTFIX_MESSAGES[
    Math.floor(Math.random() * POSTFIX_MESSAGES.length)
  ];
}