import mongoose from "mongoose";
import { errorResponse } from "@/lib/server/apiResponse";
import { connectToDatabase } from "@/lib/server/db";
import { ApiError, requireUser } from "@/lib/server/auth";
import { updateOrderStatus } from "@/lib/server/orderService";
import Order from "@/models/Order";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      throw new ApiError(400, "The order id is invalid.");
    }

    const user = await requireUser(request);
    await connectToDatabase();
    const order = await Order.findOne({ _id: id, userId: user._id }).lean();

    if (!order) throw new ApiError(404, "Order not found.");
    return Response.json({ order });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      throw new ApiError(400, "The order id is invalid.");
    }

    return await updateOrderStatus(request, id);
  } catch (error) {
    return errorResponse(error);
  }
}
