"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ProductSort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setSort(sort) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      aria-label="Sort products"
      onChange={(event) => setSort(event.target.value)}
      value={searchParams.get("sort") ?? "latest"}
      className="w-48 shrink-0 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-700 dark:text-slate-50"
    >
      <option value="latest">Sort by: Latest</option>
      <option value="name-asc">Sort by name: A - Z</option>
      <option value="name-desc">Sort by name: Z - A</option>
      <option value="price-asc">Sort by Price: Low to High</option>
      <option value="price-desc">Sort by Price High to Low</option>
    </select>
  );
};

export default ProductSort;
