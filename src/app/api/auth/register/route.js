import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/server/db";
import {
  ApiError,
  createAuthToken,
  serializeUser,
} from "@/lib/server/auth";
import { errorResponse } from "@/lib/server/apiResponse";
import User from "@/models/User";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");

    if (!name || !email || !password) {
      throw new ApiError(400, "Name, email, and password are required.");
    }

    if (password.length < 8) {
      throw new ApiError(400, "Password must be at least 8 characters long.");
    }

    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(409, "An account with this email already exists.");

    const user = await User.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 12),
      role: "customer",
      phone: String(body?.phone ?? "").trim(),
      address: {
        street: String(body?.address?.street ?? "").trim(),
        city: String(body?.address?.city ?? "").trim(),
        province: String(body?.address?.province ?? "").trim(),
      },
    });

    return Response.json(
      { user: serializeUser(user), token: createAuthToken(user) },
      { status: 201 },
    );
  } catch (error) {
    return errorResponse(error);
  }
}
