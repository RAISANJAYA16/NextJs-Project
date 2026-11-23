import mongoose from "mongoose";
import { errorResponse } from "@/lib/server/apiResponse";
import {
  deleteProduct,
  getProduct,
  updateProduct,
} from "@/lib/server/productService";
import { ApiError } from "@/lib/server/auth";

export const runtime = "nodejs";

function validateId(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "The product id is invalid.");
  }
}

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    validateId(id);
    return await getProduct(id);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    validateId(id);
    return await updateProduct(request, id);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    validateId(id);
    return await deleteProduct(request, id);
  } catch (error) {
    return errorResponse(error);
  }
}
