import { errorResponse } from "@/lib/server/apiResponse";
import { listProductMetadata } from "@/lib/server/productService";

export const runtime = "nodejs";

export async function GET() {
  try {
    return await listProductMetadata("brand");
  } catch (error) {
    return errorResponse(error);
  }
}
