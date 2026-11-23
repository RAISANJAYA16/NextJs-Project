import { ApiError } from "@/lib/server/auth";

export function errorResponse(error) {
  console.error("[api]", error);

  if (error instanceof ApiError) {
    return Response.json({ message: error.message }, { status: error.status });
  }

  const isDatabaseError =
    error?.name?.includes("Mongo") ||
    error?.name?.includes("Mongoose") ||
    error?.message?.includes("MONGODB_URI");

  return Response.json(
    {
      message: isDatabaseError
        ? "The database is unavailable. Check MONGODB_URI and MongoDB Compass/server status."
        : "An unexpected server error occurred.",
    },
    { status: isDatabaseError ? 503 : 500 },
  );
}
