import express from "express";
import { registerAdmin, registerStudent, loginAdmin, loginStudent } from "../controllers/authController.js";

const router = express.Router();

// Rutas para admin
router.post("/register/admin", registerAdmin);
router.post("/login/admin", loginAdmin);

// Rutas para estudiantes
router.post("/register/student", registerStudent);
router.post("/login/student", loginStudent);

export default router;
