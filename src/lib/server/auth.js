import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/server/db";
import User from "@/models/User";

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET must be configured with at least 32 characters.",
    );
  }

  return secret;
}

export function serializeUser(user) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    address: user.address,
  };
}

export function createAuthToken(user) {
  return jwt.sign(
    { sub: String(user._id), email: user.email },
    getJwtSecret(),
    { expiresIn: "7d" },
  );
}

function getBearerToken(request) {
  const authorization = request.headers.get("authorization") || "";
  const [scheme, token] = authorization.split(" ");

  return scheme?.toLowerCase() === "bearer" && token ? token : null;
}

export async function requireUser(request) {
  const token = getBearerToken(request);

  if (!token) {
    throw new ApiError(401, "Authentication is required.");
  }

  let payload;
  try {
    payload = jwt.verify(token, getJwtSecret());
  } catch {
    throw new ApiError(401, "The authentication token is invalid or expired.");
  }

  await connectToDatabase();
  const user = await User.findById(payload.sub);

  if (!user) {
    throw new ApiError(401, "The account for this token no longer exists.");
  }

  return user;
}

export async function requireMerchant(request) {
  const user = await requireUser(request);

  if (user.role !== "merchant") {
    throw new ApiError(403, "Merchant access is required for this action.");
  }

  return user;
}
