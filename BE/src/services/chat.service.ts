import { streamResponse } from "./llm/gemini/gemini.service.js";
import type { ChatOptions } from "./llm/types.js";

export async function* chat(options: ChatOptions) {
    const { message, timeZone } = options;
    const stream = streamResponse(message, timeZone);

  for await (const chunk of stream) {
    yield chunk;
  }
}