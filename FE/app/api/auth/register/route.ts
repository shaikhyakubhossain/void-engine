import {
  backendClient,
  handleRoute,
  validateRequest,
} from "@/server";
import { RegisterSchema } from "@/schemas/api/auth.schema";
import { createAuthCookie } from "@/server/auth-cookie";

type RegisterResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
};

export async function POST(request: Request) {
  return handleRoute(async () => {
    const body = await validateRequest(request, RegisterSchema);

    const response = await backendClient.post(
      "/api/auth/register",
      body
    ) as RegisterResponse;

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