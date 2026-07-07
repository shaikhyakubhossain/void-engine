import { ValidationError } from "./validation";
import { BackendClientError } from "@/server/BackendClient/BackendClientError";

export const handleRoute = async <T>(callback: () => Promise<T>) => {
  try {
    const result = await callback();

    if (result instanceof Response) {
      return result;
    }

    return Response.json(result);
  } catch (error) {
    if (error instanceof ValidationError) {
      return Response.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: error.message,
          },
          issues: error.issues,
        },
        {
          status: 400,
        },
      );
    }

    if (error instanceof BackendClientError) {
      return Response.json(error.body, {
        status: error.status,
      });
    }

    console.error(error);

    return Response.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected server error occurred.",
        },
      },
      {
        status: 500,
      },
    );
  }
};
