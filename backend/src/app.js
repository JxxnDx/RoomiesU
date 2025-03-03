import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", userRoutes);
app.use("/auth", authRoutes);

export default app;