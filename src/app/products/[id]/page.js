import { getProductById } from "@/api/product";
import { notFound } from "next/navigation";

async function fetchProductById(id) {
  try {
    return await getProductById(id);
  } catch {
    return null;
  }
}

export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    return {
      title: "Product not found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.name,
    description: [product.name, product.category, product.brand]
      .filter(Boolean)
      .join(" "),
  };
};

async function ProductDetailsPage({ params, searchParams }) {
  const { id } = await params;
  const { limit } = await searchParams;
  const product = await fetchProductById(id);

  if (!product) notFound();

  return (
    <div className="text-violet-500">
      <h1>Product Details Page</h1>
      <div>Name: {product.name}</div>
      <div>Category: {product.category}</div>
      <div>Brand: {product.brand}</div>
      <div>Price: {product.price}</div>
      <div>Limit: {limit ?? "N/A"}</div>
    </div>
  );
}

export default ProductDetailsPage;
