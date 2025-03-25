import express from "express";
import { registerAdmin, registerStudent, loginAdmin, loginStudent } from "../controllers/authController.js";
import { forgotPassword, resetPassword } from "../controllers/passwordController.js";

const router = express.Router();

// Rutas para admin
router.post("/register/admin", registerAdmin);
router.post("/login/admin", loginAdmin);

// Rutas para estudiantes
router.post("/register/student", registerStudent);
router.post("/login/student", loginStudent);

//Rutas para recuperación de contraseña
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
