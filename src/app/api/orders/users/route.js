import { errorResponse } from "@/lib/server/apiResponse";
import { listUserOrders } from "@/lib/server/orderService";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    return await listUserOrders(request);
  } catch (error) {
    return errorResponse(error);
  }
}
