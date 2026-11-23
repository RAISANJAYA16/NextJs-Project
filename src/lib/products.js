import { connectToDatabase } from "@/lib/server/db";
import Product from "@/models/Product";

const HIDDEN_PRODUCT_KEYWORDS = [
  "shoe",
  "shoes",
  "sneaker",
  "sneakers",
  "sandals",
  "boots",
];

function shouldHideProduct(product) {
  const searchableText = [
    product?.name,
    product?.category,
    product?.brand,
    product?.description,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return HIDDEN_PRODUCT_KEYWORDS.some((keyword) => searchableText.includes(keyword));
}

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
  await connectToDatabase();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  const serializedProducts = products.map((product) => ({
    ...product,
    _id: String(product._id),
  }));
  const visibleProducts = serializedProducts.filter(
    (product) => !shouldHideProduct(product),
  );
  return sortProducts(visibleProducts, sort);
}

export async function getProductById(id) {
  try {
    await connectToDatabase();
    const product = await Product.findById(id).lean();
    return product
      ? { ...product, _id: String(product._id) }
      : null;
  } catch {
    return null;
  }
}

export async function getCategories() {
  await connectToDatabase();
  return (await Product.distinct("category")).filter(Boolean).sort();
}

export async function getBrands() {
  await connectToDatabase();
  return (await Product.distinct("brand")).filter(Boolean).sort();
}
