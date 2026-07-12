import { providerRegistry } from "./llm/registry.js";
import type { ChatOptions } from "./llm/types.js";

export async function* chat(options: ChatOptions) {
  const provider = providerRegistry.get(options.provider);

  const stream = provider.generate({
    userMessage: options.message,
    model: options.model,
    timeZone: options.timeZone,
  });

  for await (const chunk of stream) {
    yield chunk;
  }
}
