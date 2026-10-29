"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import formatQuery from "@/utils/QueryFormatter";

const ProductFilter = ({ categories, brands }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [categoryFilter, setCategoryFilter] = useState(
    searchParams.get("category") ?? "",
  );
  const [brandsFilter, setBrandFilter] = useState(
    searchParams.get("brands")?.split(",").filter(Boolean) ?? [],
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("min") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") ?? "");
  const [search, setSearch] = useState(searchParams.get("name") ?? "");
  const [isOpen, setIsOpen] = useState(false);

  function handleBrandFilter(brand) {
    setBrandFilter((previous) =>
      previous.includes(brand)
        ? previous.filter((item) => item !== brand)
        : [...previous, brand],
    );
  }

  function filterProducts() {
    const params = new URLSearchParams(searchParams.toString());
    const filters = formatQuery({
      category: categoryFilter,
      brands: brandsFilter.join(","),
      name: search.trim(),
      min: minPrice,
      max: maxPrice,
    });

    console.log("Product filters:", filters);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    setIsOpen(false);
  }

  function clearFilters() {
    setCategoryFilter("");
    setBrandFilter([]);
    setMinPrice("");
    setMaxPrice("");
    setSearch("");

    const params = new URLSearchParams(searchParams.toString());
    ["category", "brands", "name", "min", "max"].forEach((key) =>
      params.delete(key),
    );
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
<div>
  {isOpen && (
  <div id="drawerOverlay" className="fixed inset-0 z-[1000] flex h-full w-full items-center justify-center bg-black/50">
    <div role="dialog" aria-modal="true" aria-labelledby="filter-heading" tabIndex={-1} className="relative ml-auto h-screen w-full max-w-sm bg-white shadow-lg outline-none dark:bg-neutral-800">
      <div className="overflow-auto p-6 h-[calc(100vh-66px)]">
        <div className="flex items-center border-b border-slate-300 pb-3 mb-6 dark:border-neutral-700">
          <h2 id="filter-heading" className="text-slate-900 text-lg font-semibold dark:text-slate-50">Filter</h2>
          <button type="button" onClick={clearFilters} className="text-sm text-red-500 font-semibold ml-auto cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded" aria-label="Clear all filters">Clear all</button>
        </div>
        <div>
          {/*Name */}
            <form className="max-w-md mx-auto" onSubmit={(event) => {
              event.preventDefault();
              filterProducts();
            }}>
              <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                </div>
                <input type="search"
                 id="search" 
                 onChange={(event) => setSearch(event.target.value)}
                 value={search}
                 className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" />
                <button type="submit" className="absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none">Search</button>
              </div>
            </form>


          {/* Category */}
          <fieldset>
            <legend className="text-slate-900 text-sm font-semibold dark:text-slate-50">Category</legend>

            <select
              id="categories"
              onChange={(event) => setCategoryFilter(event.target.value)}
              value={categoryFilter}
              className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-700 dark:text-slate-50"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

          </fieldset>
          <hr className="my-6 border-slate-300 dark:border-neutral-700" />

          {/* Brand */}
          <fieldset>
            <legend className="text-slate-900 text-sm font-semibold dark:text-slate-50">Brand</legend>
            <ul className="mt-6 space-y-1" aria-label="Brand options">
              {brands.map((brand, index) => (
                <li key={brand}>
                <label htmlFor={`brand-${index}`} className="inline-flex items-center gap-2.5 group">
                  <input type="checkbox"
                  id={`brand-${index}`} name="brand"
                  value={brand}
                  checked={brandsFilter.includes(brand)}
                  onChange={() => handleBrandFilter(brand)} />
                   {brand}
                </label>
              </li>
              ))}

            </ul>
          </fieldset>
          <hr className="my-6 border-slate-300 dark:border-neutral-700" />
          {/* Size */}
        
          <hr className="my-6 border-slate-300 dark:border-neutral-700" />
          {/* Price */}
          <fieldset>
            <legend id="price-heading" className="text-slate-900 text-sm font-semibold dark:text-slate-50">
              Price
            </legend>
          
            <div className="flex gap-2.5 ">
              <div className="max-w-sm mx-auto">
                <label htmlFor="min-input" className="block mt-2 text-sm font-medium text-heading">Min Price</label>
                <input type="number"
                id="min-input" 
                min="0"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}

                className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border rounded-2xl text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder={1000}  />
              </div>
              <div className="max-w-sm mx-auto">
                <label htmlFor="max-input" className="block mt-2 text-sm font-medium text-heading">Max Price</label>
                <input type="number"
                min="0"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                 id="max-input"
                 className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border rounded-2xl text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder={100000} />
              </div>
            </div>


          </fieldset>
          <hr className="my-6 border-slate-300 dark:border-neutral-700" />
      

        </div>
      </div>
      <div className="p-4 flex gap-2 absolute bottom-0 w-full border-t border-slate-300 bg-white dark:bg-neutral-800 dark:border-neutral-700">
        <button type="button"
         onClick={filterProducts}
         className="w-full px-3.5 py-2 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 border border-blue-600 transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          Apply</button>

        <button type="button" id="closeDrawer" onClick={() => setIsOpen(false)} className="w-full px-3.5 py-2 text-slate-900 text-sm font-semibold rounded-md cursor-pointer bg-white border border-slate-300 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-50 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:border-neutral-700">
          Close</button>
      </div>
    </div>
  </div>
  )}
  <button type="button" onClick={() => setIsOpen(true)} aria-expanded={isOpen} aria-controls="drawerOverlay" className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-700 dark:text-slate-50 dark:hover:bg-neutral-600">
    <span>Filter</span>
    <FaFilter aria-hidden="true" className="shrink-0" />
  </button>
</div>

  )
}

export default ProductFilter
