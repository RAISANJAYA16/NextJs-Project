"use client";

import Link from "next/link";
import useCartStore from "@/stores/cartStore";
import { getOrderTotals } from "@/lib/orderTotals";

export default function CheckoutPage() {
  const products = useCartStore((state) => state.products);
  const subtotal = products.reduce(
    (total, product) =>
      total + Number(product.price ?? 0) * (product.quantity ?? 1),
    0,
  );
  const { savings, deliveryCharge, tax, total } = getOrderTotals(subtotal);

  return (
    <section className="bg-white py-8 dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-lg px-4">
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
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Payment and order submission are not available yet.
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
