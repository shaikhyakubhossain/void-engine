import { ApiClient } from "@/services/ApiClient";

import type {
  ApiResponse,
  LLMStateData,
  ProviderInfo,
  ProviderModels,
} from "@/types/api";

const apiClient = new ApiClient("/api");

export class LLMService {
  static async getProviders(): Promise<ApiResponse<ProviderInfo[]>> {
    return apiClient.get<ApiResponse<ProviderInfo[]>>("/llm/providers");
  }

  static async getModels(): Promise<ApiResponse<ProviderModels[]>> {
    return apiClient.get<ApiResponse<ProviderModels[]>>("/llm/models");
  }

  static async initialize(): Promise<LLMStateData> {
    const response = await this.getModels();

    if (!response.success) {
      throw new Error(response.error.message);
    }

    const providerModels = response.data;

    const providers = Array.from(
      new Map(
        providerModels.map((group) => [group.provider.id, group.provider]),
      ).values(),
    );

    const defaults = this.getDefaultSelection(providerModels);

    return {
      providers,
      providerModels,
      ...defaults,
    };
  }

  private static getDefaultSelection(providerModels: ProviderModels[]) {
    const firstProvider = providerModels[0];

    const defaultModel =
      firstProvider?.models.find((model) => model.recommended) ??
      firstProvider?.models[0];

    return {
      selectedProvider: firstProvider?.provider.id ?? null,

      selectedModel: defaultModel?.id ?? null,
    };
  }
}
