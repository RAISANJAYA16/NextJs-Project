"use client";

import { useCallback, useEffect, useState } from "react";
import useAuthStore from "@/stores/authStores";

const statuses = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function MerchantOrdersPage() {
  const token = useAuthStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    if (!token) return [];

    const response = await fetch("/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(result?.message || "Unable to load orders.");
    }

    return result?.orders ?? [];
  }, [token]);

  useEffect(() => {
    let active = true;

    fetchOrders()
      .then((nextOrders) => {
        if (active) setOrders(nextOrders);
      })
      .catch((loadError) => {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load orders.",
          );
        }
      });

    return () => {
      active = false;
    };
  }, [fetchOrders]);

  async function updateStatus(orderId, status) {
    setError("");
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    const result = await response.json().catch(() => null);

    if (!response.ok) {
      setError(result?.message || "Unable to update order status.");
      return;
    }

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order._id === orderId ? { ...order, status: result.order.status } : order,
      ),
    );
  }

  return (
    <main className="mx-auto max-w-screen-xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Manage orders</h1>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3 font-mono text-xs">{order._id}</td>
                <td className="px-4 py-3 font-mono text-xs">{order.userId}</td>
                <td className="px-4 py-3">Rs. {Number(order.totalPrice ?? 0).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(event) => updateStatus(order._id, event.target.value)}
                    className="rounded border border-gray-300 bg-white px-2 py-1 dark:border-gray-600 dark:bg-gray-800"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!orders.length && <p className="p-6 text-sm text-gray-500">No orders found.</p>}
      </div>
    </main>
  );
}
