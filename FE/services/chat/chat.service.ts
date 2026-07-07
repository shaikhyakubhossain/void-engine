import { ApiClient } from "@/services/ApiClient";

import type {
  ApiResponse,
  CreateMessageRequest,
  CreateMessageResponse,
} from "@/types/api";

const apiClient = new ApiClient("/api");

export class ChatService {
  static async createMessage(
    request: CreateMessageRequest,
  ): Promise<ApiResponse<CreateMessageResponse>> {
    return apiClient.post<ApiResponse<CreateMessageResponse>>("/chat", request);
  }

  static async streamMessage(
    request: CreateMessageRequest,
  ): Promise<ReadableStreamDefaultReader<Uint8Array>> {
    const response = await apiClient.postStream("/chat", request);

    if (!response.body) {
      throw new Error("Response body is missing.");
    }

    return response.body.getReader();
  }
}
