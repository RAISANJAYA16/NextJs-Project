import { APP_API_BASE_URL } from "@/api/config";

async function orderRequest(path, { method, data, token }) {
  if (!token) {
    throw new Error("You must log in to access orders.");
  }

  const response = await fetch(`${APP_API_BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(data ? { "Content-Type": "application/json" } : {}),
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
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
    const error = new Error(
      `Unable to ${method === "GET" ? "load orders" : "create order"} (${response.status})${message ? `: ${message}` : ""}`,
    );
    error.status = response.status;
    throw error;
  }

  return result;
}

export const createOrder = (data, token) =>
  orderRequest("/api/order", { method: "POST", data, token });

export const getOrdersByUsers = (token) =>
  orderRequest("/api/orders/users", { method: "GET", token });
