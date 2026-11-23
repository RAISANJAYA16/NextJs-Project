import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    brand: String,
    category: String,
    price: Number,
    stock: Number,
    imageUrls: [String],
    description: String,
    createdBy: String,
    sourceProductId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

const uri = process.env.MONGODB_URI;
const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://mern-20251103-api.vercel.app";

if (!uri) throw new Error("MONGODB_URI is required.");

const response = await fetch(`${apiBaseUrl}/api/products?limit=1000`);
if (!response.ok) {
  throw new Error(`Product API returned ${response.status}.`);
}

const products = await response.json();
if (!Array.isArray(products)) throw new Error("Product API did not return an array.");

await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

const operations = products.map((product) => {
  const sourceProductId = String(product._id ?? product.id ?? "");
  return {
    updateOne: {
      filter: { sourceProductId },
      update: {
        $set: {
          name: String(product.name ?? "Unnamed product"),
          brand: String(product.brand ?? "Unknown"),
          category: String(product.category ?? "Other"),
          price: Number(product.price ?? 0),
          stock: Number(product.stock ?? 0),
          imageUrls: Array.isArray(product.imageUrls)
            ? product.imageUrls.filter(Boolean).map(String)
            : [],
          description: String(product.description ?? ""),
          sourceProductId,
        },
      },
      upsert: true,
    },
  };
});

if (operations.length) await Product.bulkWrite(operations, { ordered: false });
console.log(`Imported ${products.length} product(s) into MongoDB.`);
await mongoose.disconnect();
