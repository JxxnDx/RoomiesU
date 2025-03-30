import jwt from "jsonwebtoken";
import { AuthService } from "../services/authService.js"; // Asegúrate de que la ruta sea correcta

// 🔹 Login de Administrador
export const loginAdmin = async (req, res) => {
    try {
        if (!req.body.correo || !req.body.password) {
            return res.status(400).json({ message: "Faltan datos requeridos" });
        }

        const result = await AuthService.login(req.body, "administrador");
        if (result.error) {
            return res.status(401).json({ message: result.error });
        }

        // Configurar cookie con el token
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Solo en producción
            sameSite: "lax",
            maxAge: 3600000, // 1 hora
        });
        console.log("✅ Cookie enviada en la respuesta:", res.getHeaders()["set-cookie"]); 
        res.status(200).json({ message: "Inicio de sesión exitoso", role: result.role });
    } catch (error) {
        console.error("Error en loginAdmin:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// 🔹 Login de Estudiante
export const loginStudent = async (req, res) => {
    try {
        if (!req.body.correo || !req.body.password) {
            return res.status(400).json({ message: "Faltan datos requeridos" });
        }

        const result = await AuthService.login(req.body, "estudiante");
        if (result.error) {
            return res.status(401).json({ message: result.error });
        }

        // Configurar cookie con el token
        res.cookie("token", result.token, {
            httpOnly: true,
             secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 3600000, 
        });
        console.log("✅ Cookie enviada en la respuesta:", res.getHeaders()["set-cookie"]); 
        res.status(200).json({ message: "Inicio de sesión exitoso", role: result.role });
    } catch (error) {
        console.error("Error en loginStudent:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// 🔹 Registro de Administrador
export const registerAdmin = async (req, res) => {
    try {
        if (!req.body.correo || !req.body.password || !req.body.nombre) {
            return res.status(400).json({ message: "Faltan datos requeridos" });
        }

        const result = await AuthService.register(req.body, "administrador");
        if (result.error) {
            return res.status(400).json({ message: result.error });
        }
        res.status(201).json({ message: "Admin registrado con éxito", userId: result.id });
    } catch (error) {
        console.error("Error en registerAdmin:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// 🔹 Registro de Estudiante
export const registerStudent = async (req, res) => {
    try {
        if (!req.body.correo || !req.body.password || !req.body.nombre) {
            return res.status(400).json({ message: "Faltan datos requeridos" });
        }

        const result = await AuthService.register(req.body, "estudiante");
        if (result.error) {
            return res.status(400).json({ message: result.error });
        }
        res.status(201).json({ message: "Estudiante registrado con éxito", userId: result.id });
    } catch (error) {
        console.error("Error en registerStudent:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// 🔹 Obtener usuario autenticado
export const getAuthenticatedUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        console.log("Cookies recibidas:", req.cookies); 
        if (!token) {
            return res.status(401).json({ message: "No autenticado" });
        }

        // Verificar el token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("🔍 Token decodificado:", decoded); // Log para verificar los valores
        } catch (error) {
            return res.status(401).json({ message: "Token inválido o expirado" });
        }

        // Validar que el token contiene los datos esperados
        if (!decoded.userId || !decoded.role) {
            console.error("❌ Error: Token sin userId o role ->", decoded);
            return res.status(400).json({ message: "Token inválido" });
        }

        // Obtener el usuario
        const user = await AuthService.getUserById(decoded.userId, decoded.role);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ user: { id: user.id, nombre: user.nombre, correo: user.correo, role: user.role } });

    } catch (error) {
        console.error("❌ Error en getAuthenticatedUser:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

// 🔹 Cerrar sesión y eliminar la cookie del token
export const logout = (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
        res.status(200).json({ message: "Sesión cerrada exitosamente" });
    } catch (error) {
        console.error("Error en logout:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
