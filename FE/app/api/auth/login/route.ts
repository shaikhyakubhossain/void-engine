import {
  backendClient,
  handleRoute,
  validateRequest,
} from "@/server";
import { LoginSchema } from "@/schemas/api/auth.schema";
import { createAuthCookie } from "@/server/auth-cookie";

type LoginResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
};

export async function POST(request: Request) {
  return handleRoute(async () => {
    const body = await validateRequest(request, LoginSchema);

    const response = await backendClient.post(
      "/api/auth/login",
      body
    ) as LoginResponse;

    return Response.json(
      {
        user: response.user,
      },
      {
        headers: {
          "Set-Cookie": createAuthCookie(response.token),
        },
      }
    );
  });
}