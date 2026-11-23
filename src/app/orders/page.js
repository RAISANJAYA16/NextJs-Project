"use client";
import { useEffect, useState } from "react";
import { getOrdersByUsers } from "@/lib/order";
import useAuthStore from "@/stores/authStores";

export default function OrdersPage() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");
  const token = useAuthStore((state) => state.token);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated || !token) return;

    getOrdersByUsers(token)
      .then(setOrders)
      .catch((requestError) => {
        if (requestError?.status === 401) {
          logoutUser();
          setError("Your session expired. Please log in again.");
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load orders.",
        );
      });
  }, [hasHydrated, logoutUser, token]);

  return (
    <main className="mx-auto max-w-screen-lg px-4 py-8">
      <h1 className="text-2xl font-semibold">Orders</h1>
      {!hasHydrated && <p className="mt-4">Loading account...</p>}
      {hasHydrated && !token && (
        <p className="mt-4">Log in to view your orders.</p>
      )}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {orders !== null && (
        <pre className="mt-4 overflow-auto rounded-lg bg-neutral-100 p-4 text-sm dark:bg-neutral-800">
          {JSON.stringify(orders, null, 2)}
        </pre>
      )}
    </main>
  );
}
