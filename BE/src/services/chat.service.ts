import { generateResponse } from "./llm/gemini.service.js";
import type { ChatOptions } from "./llm/types.js";

export async function chat(options: ChatOptions) {
    const { message, timeZone } = options;
    return await generateResponse(message, timeZone);
}