import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectDB from "./dbs/mongoosedb.js";
import { app, server } from "./socket/socket.js";
//
import path from "path";

const PORT = process.env.PORT || 5000;
//
const __dirname = path.resolve();

app.use(express.json()); //to parse the incoming requests with json payloads (from req.body)

const client_url = process.env.CLIENT_URL;
const allowedOrigins = ["http://localhost:5173", "http://localhost:8000", client_url].filter(Boolean);

app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//
app.use(express.static(path.join(__dirname, "/frontend/dist")));

export const handler = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Request initialization failed:", error.message);
    return res.status(500).json({ error: "Database connection failed" });
  }
};

if (!process.env.VERCEL) {
  connectDB()
    .then(() => {
      server.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Server startup failed:", error.message);
      process.exit(1);
    });
}

export default handler;
