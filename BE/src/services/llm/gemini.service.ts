import { gemini } from '../../config/llm.js';
import { buildPrompt } from "./promptBuilder.js";

export async function generateResponse(message: string) {
    const prompt = buildPrompt(message);

    const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return response.text;
}