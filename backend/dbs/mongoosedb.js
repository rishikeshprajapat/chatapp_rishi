import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_DB_URL;

    if (mongoUrl && process.env.USE_MEMORY_DB !== "true") {
      await mongoose.connect(mongoUrl);
      console.log("connected to mongodb");
      return;
    }

    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log("connected to in-memory mongodb");
  } catch (error) {
    console.log("Error connecting to mongodb", error.message);
    throw error;
  }
};

export default connectDB;
