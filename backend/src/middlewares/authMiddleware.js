import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // Leer el token de las cookies

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. No hay token." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guardar datos del usuario en la petición
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido o expirado." });
    }
};

// Middleware para verificar si el usuario es admin
export const isAdmin = (req, res, next) => {
    if (req.user.role !== "administrador") {
        return res.status(403).json({ message: "Acceso denegado. No eres administrador." });
    }
    next();
};

// Middleware para verificar si el usuario es estudiante
export const isStudent = (req, res, next) => {
    if (req.user.role !== "estudiante") {
        return res.status(403).json({ message: "Acceso denegado. No eres estudiante." });
    }
    next();
};


