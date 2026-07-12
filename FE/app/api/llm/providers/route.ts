import {
  backendClient,
  handleRoute,
} from "@/server";

export async function GET() {
  return handleRoute(async () => {
    const response = await backendClient.get(
      "/api/llm/providers",
    );

    return Response.json(response);
  });
}