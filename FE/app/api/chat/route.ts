import {
  backendClient,
  handleRoute,
  validateRequest,
} from "@/server";
import { CreateMessageRequestSchema } from "@/schemas/api/chat.schema";

export async function POST(request: Request) {
  return handleRoute(async () => {
    const body = await validateRequest(
      request,
      CreateMessageRequestSchema,
    );

    const response = await backendClient.postStream(
      "/api/chat",
      body,
    );

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  });
}