import { generateResponse } from "./llm/gemini.service.js";

export async function chat(message: string) {
    return await generateResponse(message);
}