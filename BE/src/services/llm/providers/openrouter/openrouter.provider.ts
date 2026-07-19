import { openrouter } from "../../../../config/llm.js";
import { ErrorCode } from "../../../../constants/index.js";
import {
  AIProviderError,
  isApiError,
} from "../../../../errors/AIProviderError.js";
import { getCurrentDateTime } from "../../../../utils/dateTime.utils.js";
import { buildPrompt } from "../../promptBuilder.js";
import type { GenerateOptions, LLMProvider, ModelInfo } from "../../types.js";
import { BaseProvider } from "../BaseProvider.js";
import { OPENROUTER_CACHE_TTL } from "./index.js";
import type { OpenRouterModel } from "./openrouter.types.js";

export class OpenRouterProvider extends BaseProvider implements LLMProvider {
  readonly provider = "openrouter" as const;

  readonly displayName = "OpenRouter";

  protected readonly CACHE_TTL = OPENROUTER_CACHE_TTL;

  async *generate({
    userMessage,
    model,
    timeZone,
  }: GenerateOptions): AsyncGenerator<string> {
    try {
      const builtPrompt = buildPrompt({
        userMessage,
        currentDate: getCurrentDateTime(timeZone),
      });

      const stream = await openrouter.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content: builtPrompt.systemInstruction,
          },
          {
            role: "user",
            content: builtPrompt.userMessage,
          },
        ],
        stream: true,
      });

      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content;

        if (text) {
          yield text;
        }
      }
    } catch (error: unknown) {
      if (isApiError(error) && error.status === 429) {
        throw new AIProviderError(
          429,
          ErrorCode.RATE_LIMITED,
          "OpenRouter API quota exceeded.",
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
    if (this.hasValidCache()) {
      return this.modelsCache!;
    }

    try {
      const models = await this.fetchModels();

      this.sortModels(models);

      this.updateCache(models);

      return models;
    } catch {
      if (this.modelsCache) {
        return this.modelsCache;
      }

      throw new AIProviderError(
        500,
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Failed to fetch OpenRouter models.",
      );
    }
  }

  private async fetchModels(): Promise<ModelInfo[]> {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch OpenRouter models.");
    }

    const { data } = await response.json();

    return data.map((model: OpenRouterModel) => this.toModelInfo(model));
  }

  private toModelInfo(model: OpenRouterModel): ModelInfo {
  const modelInfo: ModelInfo = {
    id: model.id,
    name: model.name,
    provider: "openrouter",

    supportsStreaming: true,
    supportsVision:
      model.architecture?.input_modalities?.includes("image") ?? false,
    supportsTools: true,

    recommended: false,
    enabled: true,
  };

  if (model.description) {
    modelInfo.description = model.description;
  }

  if (model.context_length !== undefined) {
    modelInfo.contextWindow = model.context_length;
  }

  return modelInfo;
}

}
