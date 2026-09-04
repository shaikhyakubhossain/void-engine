import {
  backendClient,
  handleRoute,
} from "@/server";
import { getAuthToken } from "@/server/auth-cookie";

export async function GET(request: Request) {
  return handleRoute(async () => {
    const token = getAuthToken(request);

    if (!token) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    return backendClient.get("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });
}