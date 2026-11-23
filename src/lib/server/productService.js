import { connectToDatabase } from "@/lib/server/db";
import { ApiError, requireMerchant } from "@/lib/server/auth";
import Product from "@/models/Product";

const MAX_LIMIT = 1000;

function parseProductBody(body) {
  const name = String(body?.name ?? "").trim();
  const brand = String(body?.brand ?? "").trim();
  const category = String(body?.category ?? "").trim();
  const price = Number(body?.price);
  const stock = Number(body?.stock ?? 0);
  const imageUrls = Array.isArray(body?.imageUrls)
    ? body.imageUrls.filter(Boolean).map(String)
    : [];
  const description = String(body?.description ?? "").trim();

  if (!name || !brand || !category) {
    throw new ApiError(400, "Name, brand, and category are required.");
  }

  if (!Number.isFinite(price) || price < 0) {
    throw new ApiError(400, "Price must be a non-negative number.");
  }

  if (!Number.isInteger(stock) || stock < 0) {
    throw new ApiError(400, "Stock must be a non-negative whole number.");
  }

  return {
    name,
    brand,
    category,
    price: Math.round(price * 100) / 100,
    stock,
    imageUrls,
    description,
  };
}

function parseFilter(request) {
  const filter = request.nextUrl.searchParams.get("filter");
  if (!filter) return {};

  try {
    const parsed = JSON.parse(filter);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("invalid filter");
    }

    const query = {};
    for (const key of ["name", "brand", "category"]) {
      if (typeof parsed[key] === "string" && parsed[key].trim()) {
        query[key] = { $regex: parsed[key].trim(), $options: "i" };
      }
    }
    return query;
  } catch {
    throw new ApiError(400, "The product filter must be valid JSON.");
  }
}

export async function listProducts(request) {
  await connectToDatabase();
  const limitParam = request.nextUrl.searchParams.get("limit");
  const requestedLimit = Number(limitParam);
  const limit = limitParam && Number.isInteger(requestedLimit)
    ? Math.min(Math.max(requestedLimit, 1), MAX_LIMIT)
    : MAX_LIMIT;
  const products = await Product.find(parseFilter(request))
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return Response.json(products);
}

export async function getProduct(id) {
  await connectToDatabase();
  const product = await Product.findById(id).lean();
  if (!product) throw new ApiError(404, "Product not found.");
  return Response.json(product);
}

export async function createProduct(request) {
  const merchant = await requireMerchant(request);
  const body = await request.json().catch(() => null);
  const product = await Product.create({
    ...parseProductBody(body),
    createdBy: String(merchant._id),
  });

  return Response.json({ product }, { status: 201 });
}

export async function updateProduct(request, id) {
  await requireMerchant(request);
  const body = await request.json().catch(() => null);
  const product = await Product.findByIdAndUpdate(
    id,
    { $set: parseProductBody(body) },
    { new: true, runValidators: true },
  ).lean();

  if (!product) throw new ApiError(404, "Product not found.");
  return Response.json({ product });
}

export async function deleteProduct(request, id) {
  await requireMerchant(request);
  const product = await Product.findByIdAndDelete(id).lean();
  if (!product) throw new ApiError(404, "Product not found.");
  return Response.json({ message: "Product deleted successfully." });
}

export async function listProductMetadata(field) {
  await connectToDatabase();
  const values = await Product.distinct(field);
  return Response.json(values.filter(Boolean).sort((a, b) => a.localeCompare(b)));
}
