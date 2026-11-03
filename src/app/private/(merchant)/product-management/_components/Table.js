"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { deleteProduct } from "@/api/product";
import useAuthStore from "@/stores/authStores";
import { getProductImageUrl } from "@/lib/imageUrl";

const ProductsTable = ({ products = [] }) => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const visibleProducts = products.slice(0, 10);

  async function handleDelete(product) {
    const id = product._id ?? product.id;
    if (id == null || !window.confirm(`Delete "${product.name}"?`)) return;

    setDeleteError("");
    setDeletingId(id);
    try {
      await deleteProduct(id, token);
      router.refresh();
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : "Unable to delete product.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="overflow-x-auto">
      {deleteError && (
        <p className="px-4 py-3 text-sm text-red-700" role="alert">
          {deleteError}
        </p>
      )}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Product</th>
            <th scope="col" className="px-4 py-3">Category</th>
            <th scope="col" className="px-4 py-3">Brand</th>
            <th scope="col" className="px-4 py-3">Price</th>
            <th scope="col" className="px-4 py-3">Stock</th>
            <th scope="col" className="px-4 py-3">Created at</th>
            <th scope="col" className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product) => {
              const id = product._id ?? product.id;
              const createdAt = product.createdAt ?? product.created_at;
              const date = createdAt ? new Date(createdAt) : null;
              const formattedDate =
                date && !Number.isNaN(date.getTime())
                  ? date.toLocaleDateString()
                  : "—";

              return (
                <tr
                  key={id ?? product.name}
                  className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <th
                    scope="row"
                    className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Image
                      src={getProductImageUrl(product.imageUrls?.[0])}
                      alt={product.name || "Product"}
                      width={64}
                      height={64}
                      className="w-8 h-8 mr-3 object-cover"
                    />
                    {product.name || "Unnamed product"}
                  </th>
                  <td className="px-4 py-2">{product.category || "—"}</td>
                  <td className="px-4 py-2">{product.brand || "—"}</td>
                  <td className="px-4 py-2">
                    {product.price == null ? "—" : `Rs. ${product.price}`}
                  </td>
                  <td className="px-4 py-2">{product.stock ?? "—"}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{formattedDate}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-6">
                      {id != null ? (
                        <Link
                          href={`/product-management/update/${encodeURIComponent(id)}`}
                          aria-label={`Edit ${product.name || "product"}`}
                          title="Edit"
                          className="font-medium text-blue-600 hover:underline dark:text-blue-400 cursor-pointer"  
                        >
                          <FaPencilAlt aria-hidden="true" />
                        </Link>
                      ) : (
                        <span className="text-gray-400" aria-label="Edit unavailable">
                          <FaPencilAlt aria-hidden="true" />
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDelete(product)}
                        disabled={id == null || deletingId === id}
                        aria-label={`Delete ${product.name || "product"}`}
                        className="font-medium text-red-600 hover:underline cursor-pointer disabled:opacity-50 dark:text-red-400"
                      >
                        {deletingId === id ? "Deleting..." : <FaTrash aria-hidden="true" />}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-center">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
