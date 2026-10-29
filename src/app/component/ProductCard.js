import Image from "next/image";
import Link from "next/link";
import { PRODUCTS_ROUTE } from "../constants/routes";
import { getProductImageUrl } from "@/lib/imageUrl";
import AddToCart from "./AddToCart";

function ProductCard({ product }) {
  const { name, brand, category, price, imageUrls } = product;
  const productId = product._id ?? product.id;
  const imageSrc = getProductImageUrl(imageUrls?.[0]);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">
      <Link
        href={productId ? `${PRODUCTS_ROUTE}/${productId}` : PRODUCTS_ROUTE}
        className="relative block aspect-4/3 overflow-hidden bg-slate-50"
      >
        <Image
          src={imageSrc}
          alt={name || "Product"}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
          className="object-contain p-5 transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {category && (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {category}
          </p>
        )}
        <Link
          href={productId ? `${PRODUCTS_ROUTE}/${productId}` : PRODUCTS_ROUTE}
          className="mt-2 block text-lg font-semibold text-slate-950 transition hover:text-primary"
        >
          {name}
        </Link>
        {brand && <p className="mt-1 text-sm text-slate-500">{brand}</p>}
        <p className="mt-4 text-xl font-bold text-slate-950">
          Rs {Number(price ?? 0).toLocaleString()}
        </p>
        <div className="mt-auto pt-5">
          <AddToCart product={product} />
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
