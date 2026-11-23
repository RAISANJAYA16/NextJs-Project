import mongoose from "mongoose";

const globalForMongoose = globalThis;

if (!globalForMongoose.__electroShopMongoose) {
  globalForMongoose.__electroShopMongoose = {
    connection: null,
    promise: null,
  };
}

const cache = globalForMongoose.__electroShopMongoose;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI is not configured. Add it to .env.local before using the API.",
    );
  }

  if (cache.connection) return cache.connection;

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
  }

  try {
    cache.connection = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }

  return cache.connection;
}
