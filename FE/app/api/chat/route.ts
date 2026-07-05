import {
  backendClient,
  handleRoute,
  validateRequest,
} from "@/server";
import { CreateMessageRequestSchema } from "@/schemas/api/chat.schema"

export async function POST(request: Request) {
  return handleRoute(async () => {
    const body = await validateRequest(
      request,
      CreateMessageRequestSchema,
    );

    return backendClient.post(
      "/chat",
      body,
    );
  });
}
