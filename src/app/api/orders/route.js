import { errorResponse } from "@/lib/server/apiResponse";
import { createOrder, listAllOrders } from "@/lib/server/orderService";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    return await createOrder(request);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function GET(request) {
  try {
    return await listAllOrders(request);
  } catch (error) {
    return errorResponse(error);
  }
}
