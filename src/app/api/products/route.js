import { errorResponse } from "@/lib/server/apiResponse";
import {
  createProduct,
  listProducts,
} from "@/lib/server/productService";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    return await listProducts(request);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request) {
  try {
    return await createProduct(request);
  } catch (error) {
    return errorResponse(error);
  }
}
