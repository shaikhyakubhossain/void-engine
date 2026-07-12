import { GeminiProvider } from "./providers/gemini/gemini.provider.js";
import type { AIProvider, LLMProvider } from "./types.js";

class ProviderRegistry {
  private readonly providers = new Map<AIProvider, LLMProvider>();

  constructor() {
    this.register(new GeminiProvider());
  }

  register(provider: LLMProvider): void {
    this.providers.set(provider.provider, provider);
  }

  get(provider: AIProvider): LLMProvider {
    const instance = this.providers.get(provider);

    if (!instance) {
      throw new Error(`Provider "${provider}" is not registered.`);
    }

    return instance;
  }

  getAll(): LLMProvider[] {
    return [...this.providers.values()];
  }
}

export const providerRegistry = new ProviderRegistry();