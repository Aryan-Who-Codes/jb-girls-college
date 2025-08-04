/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Mongoose } from "mongoose";

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  // Check for MongoDB URL in environment variables
  const MONGODB_URL =
    process.env.MONGO_URL || process.env.MONGODB_URL || process.env.MONGODB_URI;

  if (!MONGODB_URL) {
    throw new Error(
      "⚠️ Missing MongoDB URL in environment variables. Please set MONGO_URL, MONGODB_URL, or MONGODB_URI in your .env.local file"
    );
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URL, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ Connected to MongoDB");
  } catch (e) {
    cached.promise = null;
    console.error("❌ MongoDB connection error:", e);
    throw e;
  }

  return cached.conn;
};

export default connectToDatabase;
