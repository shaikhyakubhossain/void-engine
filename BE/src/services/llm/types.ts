export interface ChatOptions {
    message: string;
    systemPrompt?: string;
    history?: {
        role: "user" | "assistant";
        content: string;
    }[];
}