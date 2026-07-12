import { gemini } from "../../../../config/llm.js";
import { ErrorCode } from "../../../../constants/errorCodes.js";
import { AIProviderError, isApiError } from "../../../../errors/AIProviderError.js";
import { getCurrentDateTime } from "../../../../utils/dateTime.utils.js";
import { buildPrompt } from "../../promptBuilder.js";
import type { GenerateOptions, LLMProvider, ModelInfo } from "../../types.js";

export class GeminiProvider implements LLMProvider {
  readonly provider = "gemini" as const;

  async *generate({
    userMessage,
    model,
    timeZone,
  }: GenerateOptions): AsyncGenerator<string> {
    try {
      const builtPrompt = buildPrompt({
        userMessage: userMessage,
        currentDate: getCurrentDateTime(timeZone),
      });

      const stream = await gemini.models.generateContentStream({
        model,
        contents: builtPrompt.userMessage,
        config: {
          systemInstruction: builtPrompt.systemInstruction,
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

  async listModels(): Promise<ModelInfo[]> {
    // TODO: replace with Gemini's list models endpoint, i will add later
    

    return [
      {
        id: "gemini-2.5-flash",
        name: "Gemini 2.5 Flash",
        provider: "gemini",
        supportsStreaming: true,
        supportsVision: true,
        supportsTools: true,
        recommended: true,
      },
    ];
  }
}