import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Auth } from "../models/Auth.js";

dotenv.config();

export class AuthService {
    static async register(userData, tableName) {
        try {
            // Verificar si el correo ya existe
            const existingUser = await Auth.findByEmail(userData.correo, tableName);
            if (existingUser) {
                return { error: "El correo ya está en uso." };
            }

            // Generar salt y hash de la contraseña
            const salt = crypto.randomBytes(16).toString("hex");
            const hash = crypto.createHmac("sha256", salt).update(userData.password).digest("hex");

            // Insertar usuario en la base de datos
            const userId = await Auth.create({ ...userData, salt, hash }, tableName);
            return { id: userId };
        } catch (error) {
            console.error("Error en el registro:", error);
            throw error;
        }
    }

    static async login({ correo, password }, tableName) {
        try {
            // Buscar usuario por correo
            const user = await Auth.findByEmail(correo, tableName);
            if (!user) {
                return { error: "Credenciales inválidas" };
            }
    
            console.log("🔍 Usuario encontrado:", user);
    
            // Verificar la contraseña con SHA-256 y el salt
            const hashedPassword = crypto.createHmac("sha256", user.Salt).update(password).digest("hex");
            if (hashedPassword !== user.Hash) {
                return { error: "Credenciales inválidas" };
            }
    
            // Determinar el campo correcto para el ID
            const userIdField = tableName === "estudiante" ? "Id_Estudiante" : "Id_Administrador";
    
            console.log(`📌 Buscando campo de ID: ${userIdField}`);
    
            // Verificar que el ID del usuario existe
            if (!user[userIdField]) {
                console.error("❌ Error: ID del usuario no encontrado en la base de datos.");
                return { error: "Error interno: Usuario sin ID válido." };
            }
    
            console.log("✅ ID del usuario encontrado:", user[userIdField]);
    
            // Generar JWT con el ID, el rol y el correo
          const token = jwt.sign(
            { 
                userId: user[userIdField], 
                role: tableName,
                correo: user.Correo 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

            console.log("🔑 Token generado correctamente:", token);
    
            return { message: "Inicio de sesión exitoso", token, role: tableName };
        } catch (error) {
            console.error("Error en el login:", error);
            throw error;
        }
    }
    
    // Obtener usuario por ID desde la base de datos
    static async getUserById(userId, role) {
        try {
            const table = role === "administrador" ? "administrador" : "estudiante"; // Ajusta los nombres de las tablas
            const user = await Auth.findById(userId, table);

            if (!user) {
                return null;
            }

            return { id: user.id, nombre: user.Nombre, correo: user.Correo, role };
        } catch (error) {
            console.error("Error al obtener usuario:", error);
            throw error;
        }
    }
}
