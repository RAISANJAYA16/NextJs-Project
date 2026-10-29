import ProductCard from "../component/ProductCard";
import { getProducts } from "@/lib/products";
import Link from "next/link";
import { CART_ROUTE } from "../constants/routes";
import ProductSort from "../component/ProductSort";
import ProductLimit from "../component/ProductLimit";
import ProductFilter from "../component/ProductFilter";
import { getBrands, getCategories } from "@/api/product";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Products",
  description: "Electro shop page",
};

async function ProductPage({ searchParams }) {
  const query = await searchParams;
  const sort = typeof query.sort === "string" ? query.sort : "latest";
  const requestedLimit = Number(query.limit);
  const limit = [10, 20, 50, 100].includes(requestedLimit)
    ? requestedLimit
    : 10;
  const products = await getProducts(sort);
  const category =
    typeof query.category === "string" ? query.category.toLocaleLowerCase() : "";
  const brandFilters =
    typeof query.brands === "string"
      ? query.brands.split(",").map((brand) => brand.toLocaleLowerCase())
      : [];
  const name =
    typeof query.name === "string" ? query.name.trim().toLocaleLowerCase() : "";
  const minPrice = query.min === undefined ? null : Number(query.min);
  const maxPrice = query.max === undefined ? null : Number(query.max);
  const filteredProducts = products.filter((product) => {
    const productCategory = String(product.category ?? "").toLocaleLowerCase();
    const productBrand = String(product.brand ?? "").toLocaleLowerCase();
    const productName = String(product.name ?? "").toLocaleLowerCase();
    const price = Number(product.price);

    return (
      (!category || productCategory === category) &&
      (!brandFilters.length || brandFilters.includes(productBrand)) &&
      (!name || productName.includes(name)) &&
      (minPrice === null || !Number.isFinite(minPrice) || price >= minPrice) &&
      (maxPrice === null || !Number.isFinite(maxPrice) || price <= maxPrice)
    );
  });

  const categories = await getCategories();
  const brands = await getBrands();
  return (
    <section className="bg-primary/5">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Shop customer favorites
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Popular Products </h2>

            
            
            <p className="mt-3 max-w-2xl text-base text-gray-600">
              Explore popular picks and find your next favorite.
            </p>
          </div>
          <div className="flex w-full min-w-0 items-center gap-3 overflow-x-auto sm:w-auto sm:justify-end">
            <div className="flex shrink-0 flex-nowrap items-center gap-2">
              <ProductSort />
              <ProductLimit />
              <ProductFilter categories={categories} brands={brands} />
            </div>
            <Link
              href={CART_ROUTE}
              className="inline-flex w-fit shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L21 8H6"
                />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              View cart
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.slice(0, limit).map((product) => (
            <ProductCard key={product._id ?? product.id ?? product.name} product={product}
            />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p className="mt-8 text-center text-gray-600">
            No products match these filters.
          </p>
        )}
      </div>
    </section>
  );
}

export default ProductPage;
