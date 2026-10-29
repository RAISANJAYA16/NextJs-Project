"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ProductLimit = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLimit = searchParams.get("limit");
  const selectedLimit = ["10", "20", "50", "100"].includes(currentLimit)
    ? currentLimit
    : "10";

  function setLimit(limit) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", limit);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      onChange={(event) => setLimit(event.target.value)}
      value={selectedLimit}
      aria-label="Products per page"
      className="w-32 shrink-0 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-700 dark:text-slate-50"
    >
      <option value="10">Limit: 10</option>
      <option value="20">Limit: 20</option>
      <option value="50">Limit: 50</option>
      <option value="100">Limit: 100</option>
    </select>
  );
};

export default ProductLimit;