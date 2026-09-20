import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let connectionPromise;
let mongoServer;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
  try {
    const mongoUrl = process.env.MONGO_DB_URL;

    if (mongoUrl && process.env.USE_MEMORY_DB !== "true") {
      await mongoose.connect(mongoUrl);
      console.log("connected to mongodb");
      return;
    }

    if (process.env.VERCEL || process.env.NODE_ENV === "production") {
      throw new Error("MONGO_DB_URL must be configured in production");
    }

    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log("connected to in-memory mongodb");
  } catch (error) {
    connectionPromise = undefined;
    console.log("Error connecting to mongodb", error.message);
    throw error;
  }
  })();

  return connectionPromise;
};

export default connectDB;
