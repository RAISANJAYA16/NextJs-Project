import { API_BASE_URL } from "@/api/config";

function sortProducts(products, sort) {
  const sortedProducts = [...products];

  switch (sort) {
    case "name-asc":
      return sortedProducts.sort((a, b) =>
        String(a.name ?? "").localeCompare(String(b.name ?? "")),
      );
    case "name-desc":
      return sortedProducts.sort((a, b) =>
        String(b.name ?? "").localeCompare(String(a.name ?? "")),
      );
    case "price-asc":
      return sortedProducts.sort(
        (a, b) => Number(a.price ?? 0) - Number(b.price ?? 0),
      );
    case "price-desc":
      return sortedProducts.sort(
        (a, b) => Number(b.price ?? 0) - Number(a.price ?? 0),
      );
    case "latest":
    default:
      return sortedProducts.sort((a, b) => {
        const dateA = new Date(a.createdAt ?? a.created_at ?? 0).getTime();
        const dateB = new Date(b.createdAt ?? b.created_at ?? 0).getTime();
        return (Number.isFinite(dateB) ? dateB : 0) -
          (Number.isFinite(dateA) ? dateA : 0);
      });
  }
}

export async function getProducts(sort = "latest") {
  const response = await fetch(
    `${API_BASE_URL}/api/products`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Unable to load products (${response.status})${details ? `: ${details}` : ""}`,
    );
  }

  const products = await response.json();
  return sortProducts(products, sort);
}
