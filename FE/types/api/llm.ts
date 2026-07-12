export interface ProviderInfo {
  id: string;
  name: string;
}

export interface ModelInfo {
  id: string;
  name: string;

  provider: string;

  description?: string;

  supportsStreaming: boolean;
  supportsVision: boolean;
  supportsTools: boolean;

  contextWindow?: number;
  outputTokenLimit?: number;

  thinking?: boolean;

  recommended?: boolean;

  enabled: boolean;
}

export interface ProviderModels {
  provider: ProviderInfo;
  models: ModelInfo[];
}

export interface LLMStateData {
  providers: ProviderInfo[];

  providerModels: ProviderModels[];

  selectedProvider: string | null;

  selectedModel: string | null;
}
