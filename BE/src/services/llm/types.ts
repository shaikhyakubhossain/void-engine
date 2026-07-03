export interface ChatOptions {
  message: string;
  systemPrompt?: string;
  history?: {
    role: "user" | "assistant";
    content: string;
  }[];
  timeZone?: string | undefined;
}

export interface PromptContext {
  userMessage: string;
  memories?: string[];
  summary?: string;
  retrievedDocuments?: string[];
  currentDate?: string;
  userPreferences?: string[];
  systemInstruction?: string;
}

export interface BuiltPrompt {
  systemInstruction: string;
  userMessage: string;
}
