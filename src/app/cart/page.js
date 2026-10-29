"use client";

import Image from "next/image";
import Link from "next/link";
import { FaMinus, FaPlus } from "react-icons/fa";
import { PRODUCTS_ROUTE } from "@/app/constants/routes";
import { getOrderTotals } from "@/lib/orderTotals";
import { getProductImageUrl } from "@/lib/imageUrl";
import useCartStore from "@/stores/cartStore";
import RemoveFromCart from "./_components/RemoveFromCart";
import BackButton from "../component/BackButton";

const getProductId = (product) => product._id ?? product.id;

export default function CartPage() {
  const products = useCartStore((state) => state.products);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const totalPrice = products.reduce(
    (total, product) =>
      total + Number(product.price ?? 0) * (product.quantity ?? 1),
    0,
  );
  const { savings, deliveryCharge, tax, total: orderTotal } =
    getOrderTotals(totalPrice);

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <BackButton/>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h1>

        {products.length === 0 ? (
          <div className="mt-6 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">
              Your cart is empty. Browse products to add something you like.
            </p>
            <Link
              href={PRODUCTS_ROUTE}
              className="mt-4 inline-flex rounded-lg bg-primary px-5 py-2.5 font-medium text-white hover:opacity-90"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="space-y-4">
              {products.map((product) => {
                const productId = getProductId(product);
                const productHref =
                  productId == null
                    ? PRODUCTS_ROUTE
                    : `${PRODUCTS_ROUTE}/${encodeURIComponent(productId)}`;
                const quantity = product.quantity ?? 1;

                return (
                  <article
                    key={productId ?? product.name}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <Link href={productHref} className="shrink-0">
                        <Image
                          className="h-20 w-20 object-contain"
                          src={getProductImageUrl(product.imageUrls?.[0])}
                          alt={product.name || "Product"}
                          width={100}
                          height={100}
                          sizes="80px"
                        />
                      </Link>

                      <div className="min-w-0 flex-1 sm:px-4">
                        <Link
                          href={productHref}
                          className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                        >
                          {product.name || "Unnamed product"}
                        </Link>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Rs. {Number(product.price ?? 0).toLocaleString()} each
                        </p>
                        <div className="mt-3">
                          <RemoveFromCart product={product} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-6 sm:justify-end">
                        <div className="flex items-center">
                          <button
                            type="button"
                            aria-label={`Decrease ${product.name || "product"} quantity`}
                            onClick={() => decreaseQuantity(product)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                          >
                            <FaMinus aria-hidden="true" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium text-gray-900 dark:text-white">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase ${product.name || "product"} quantity`}
                            onClick={() => increaseQuantity(product)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                          >
                            <FaPlus aria-hidden="true" />
                          </button>
                        </div>
                        <p className="w-32 text-end text-base font-bold text-gray-900 dark:text-white">
                          Rs. {(Number(product.price ?? 0) * quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="h-fit space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </h2>
              <dl className="space-y-3">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 dark:text-gray-400">Subtotal</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    Rs. {totalPrice.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 dark:text-gray-400">Savings</dt>
                  <dd className="font-medium text-green-600">
                    - Rs. {savings.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 dark:text-gray-400">Delivery</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    Rs. {deliveryCharge.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 dark:text-gray-400">Tax</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    Rs. {tax.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-gray-200 pt-3 text-base font-bold dark:border-gray-700">
                  <dt className="text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-gray-900 dark:text-white">
                    Rs. {orderTotal.toLocaleString()}
                  </dd>
                </div>
              </dl>
              <Link
                href="/checkout"
                className="flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 font-medium text-white hover:opacity-90"
              >
                Proceed to checkout
              </Link>
              <Link
                href={PRODUCTS_ROUTE}
                className="flex items-center justify-center text-sm font-medium text-primary underline hover:no-underline"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
