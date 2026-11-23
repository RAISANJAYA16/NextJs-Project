"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useCartStore from "@/stores/cartStore";
import { getOrderTotals } from "@/lib/orderTotals";
import { createOrder } from "@/lib/order";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStores";
import { LOGIN_ROUTE } from "@/app/constants/routes";
import BackButton from "../component/BackButton";
import { toast } from "react-toastify";
export default function CheckoutPage() {
  const products = useCartStore((state) => state.products);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = products.reduce(
    (total, product) =>
      total + Number(product.price ?? 0) * (product.quantity ?? 1),
    0,
  );
  const { savings, deliveryCharge, tax, total } = getOrderTotals(subtotal);
  const router = useRouter();
  const isAuth = useAuthStore((state) => state.isAuth);
  const token = useAuthStore((state) => state.token);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handlePlaceOrder() {
    setIsSubmitting(true);

    try {
      const orderData = {
        products: products.map((product) => ({
          productId: product._id ?? product.id,
          name: product.name,
          price: Number(product.price ?? 0),
          imageUrl: product.imageUrls?.[0] ?? null,
          quantity: product.quantity ?? 1,
        })),
      };

      await createOrder(orderData, token);
      clearCart();
      toast.success("Your order was placed successfully.");
    } catch (error) {
      if (error?.status === 401) {
        logoutUser();
        toast.error("Your session expired. Please log in again.");
        router.replace(LOGIN_ROUTE);
        return;
      }

      toast.error(
        error instanceof Error ? error.message : "Unable to place your order.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (hasHydrated && !isAuth) {
      toast.info("You need to be logged in to access the checkout page.");
      router.replace(LOGIN_ROUTE);
    }
  }, [hasHydrated, isAuth, router]);

  if (!hasHydrated || !isAuth) return null;

  return (
    <section className="bg-white py-8 dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-lg px-4">
     
        <BackButton/>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Checkout
        </h1>

        {products.length === 0 ? (
          <div className="mt-6 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300">
              Your cart is empty. Add an item before checkout.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-block text-primary-700 underline dark:text-primary-500"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_20rem]">
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Order items
              </h2>
              <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
                {products.map((product) => (
                  <li
                    key={product._id ?? product.id}
                    className="flex justify-between gap-4 py-3 text-sm"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {product.name} × {product.quantity ?? 1}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Rs.{" "}
                      {(
                        Number(product.price ?? 0) * (product.quantity ?? 1)
                      ).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/cart"
                className="mt-4 inline-block text-primary-700 underline dark:text-primary-500"
              >
                Return to cart to make changes
              </Link>
            </div>

            <aside className="h-fit rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Order total
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 dark:text-gray-400">Subtotal</dt>
                  <dd className="text-gray-900 dark:text-white">
                    Rs. {subtotal.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 dark:text-gray-400">Savings (5%)</dt>
                  <dd className="text-green-600">
                    - Rs. {savings.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 dark:text-gray-400">
                    Delivery charge
                  </dt>
                  <dd className="text-gray-900 dark:text-white">
                    Rs. {deliveryCharge.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 dark:text-gray-400">Tax</dt>
                  <dd className="text-gray-900 dark:text-white">
                    Rs. {tax.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-gray-200 pt-3 text-base font-bold dark:border-gray-700">
                  <dt className="text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-gray-900 dark:text-white">
                    Rs. {total.toLocaleString()}
                  </dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isSubmitting || products.length === 0}
                className="mt-6 w-full rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting order..." : "Place order"}
              </button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
