export const AUTH_COOKIE_NAME = "voidengine_access_token";

const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function createAuthCookie(token: string) {
  const secure =
    process.env.NODE_ENV === "production"
      ? "; Secure"
      : "";

  return `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${secure}`;
}

export function clearAuthCookie() {
  const secure =
    process.env.NODE_ENV === "production"
      ? "; Secure"
      : "";

  return `${AUTH_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${secure}`;
}

export function getAuthToken(request: Request) {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";");

  for (const cookie of cookies) {
    const [name, ...valueParts] = cookie.trim().split("=");

    if (name === AUTH_COOKIE_NAME) {
      return decodeURIComponent(valueParts.join("="));
    }
  }

  return null;
}