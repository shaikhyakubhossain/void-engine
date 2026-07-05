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
    return apiClient.post<ApiResponse<CreateMessageResponse>>(
      "/chat",
      request,
    );
  }
}