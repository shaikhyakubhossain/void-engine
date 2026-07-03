import { gemini } from "../../config/llm.js";
import { getCurrentDateTime } from "../../utils/dateTime.js";
import { buildPrompt } from "./promptBuilder.js";

export async function generateResponse(message: string, timeZone: string | undefined) {
  const prompt = buildPrompt({
    userMessage: message,
    currentDate: getCurrentDateTime(timeZone),
  });
  
  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt.userMessage,
    config: {
      systemInstruction: prompt.systemInstruction,
    },
  });

  return response.text;
}
