export type GreetingPeriod =
  | "morning"
  | "afternoon"
  | "evening"
  | "night";

export function getGreetingPeriod(date = new Date()): GreetingPeriod {
  const hour = date.getHours();

  if (hour < 5) return "night";
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  if (hour < 22) return "evening";

  return "night";
}

export function getGreeting(date = new Date()): string {
  const greetings: Record<GreetingPeriod, string> = {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
    night: "Good night",
  };

  return greetings[getGreetingPeriod(date)];
}

export function getPersonalizedGreeting(
  userName?: string,
  date = new Date()
): string {
  const greeting = getGreeting(date);

  return userName ? `${greeting}, ${userName}.` : `${greeting}.`;
}