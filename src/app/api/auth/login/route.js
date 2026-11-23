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
    const identifier = String(body?.identifier ?? body?.email ?? "").trim();
    const password = String(body?.password ?? "");

    if (!identifier || !password) {
      throw new ApiError(400, "Email/name and password are required.");
    }

    await connectToDatabase();
    const email = identifier.toLowerCase();
    const user = await User.findOne({
      $or: [
        { email },
        { name: identifier },
      ],
    }).select("+passwordHash");
    const validPassword = user
      ? await bcrypt.compare(password, user.passwordHash)
      : false;

    if (!user || !validPassword) {
      throw new ApiError(401, "Email or password is incorrect.");
    }

    return Response.json({ user: serializeUser(user), token: createAuthToken(user) });
  } catch (error) {
    return errorResponse(error);
  }
}
