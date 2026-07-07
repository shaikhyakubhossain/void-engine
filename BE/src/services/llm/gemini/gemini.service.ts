import { gemini } from "../../../config/llm.js";
import { ErrorCode } from "../../../constants/index.js";
import {
  AIProviderError,
  isApiError,
} from "../../../errors/AIProviderError.js";
import { getCurrentDateTime } from "../../../utils/dateTime.utils.js";
import { buildPrompt } from "../promptBuilder.js";

export async function* streamResponse(
  message: string,
  timeZone: string | undefined,
) {
  try {
    const prompt = buildPrompt({
      userMessage: message,
      currentDate: getCurrentDateTime(timeZone),
    });

    const stream = await gemini.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: prompt.userMessage,
      config: {
        systemInstruction: prompt.systemInstruction,
      },
    });

    for await (const chunk of stream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error: unknown) {
    if (isApiError(error) && error.status === 429) {
      throw new AIProviderError(
        429,
        ErrorCode.RATE_LIMITED,
        "Daily Gemini API quota exceeded. Please try again later.",
      );
    }

    throw new AIProviderError(
      500,
      ErrorCode.INTERNAL_SERVER_ERROR,
      "Failed to communicate with the AI provider.",
    );
  }
}
