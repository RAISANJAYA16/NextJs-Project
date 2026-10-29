import { API_BASE_URL } from "./config";

async function authRequest(endpoint, data) {
  const response = await fetch(`${API_BASE_URL}/api/auth/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseBody = await response.text();
  let result;

  try {
    result = responseBody ? JSON.parse(responseBody) : null;
  } catch {
    result = responseBody;
  }

  if (!response.ok) {
    const message =
      typeof result === "object" && result !== null
        ? result.message || result.error
        : result;
    throw new Error(
      `Unable to ${endpoint === "login" ? "log in" : "register"} (${response.status})${message ? `: ${message}` : ""}`,
    );
  }

  return result;
}

export const login = (data) => authRequest("login", data);

export const signUp = (data) => authRequest("register", data);

export function getAuthToken(result) {
  const candidates = [result, result?.data, result?.result, result?.data?.data];
  const tokenKeys = ["token", "accessToken", "access_token", "jwt"];

  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== "object") continue;

    for (const key of tokenKeys) {
      if (typeof candidate[key] === "string" && candidate[key]) {
        return candidate[key];
      }
    }
  }

  return null;
}

export function getAuthUser(result, fallbackUser) {
  return (
    result?.user ??
    result?.data?.user ??
    result?.result?.user ??
    fallbackUser
  );
}

export const logout = () =>
  fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
  });