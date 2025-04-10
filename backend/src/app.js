import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// ✅ Middleware para configurar CORS correctamente
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // 👈 Debe ser EXACTAMENTE el frontend
  res.header("Access-Control-Allow-Credentials", "true"); // ✅ Permitir cookies
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ✅ CORS con configuración avanzada
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, // ✅ Permitir cookies
  })
);

app.use(express.json());
app.use(cookieParser()); // ✅ Habilitar la lectura de cookies

// 📌 Rutas
app.use("/api", userRoutes);
app.use("/auth", authRoutes);

export default app;
