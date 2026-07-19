import { providerRegistry } from "./registry.js";

import { GeminiProvider } from "./providers/gemini/gemini.provider.js";
import { OpenRouterProvider } from "./providers/openrouter/openrouter.provider.js";

providerRegistry.register(new GeminiProvider());
providerRegistry.register(new OpenRouterProvider());