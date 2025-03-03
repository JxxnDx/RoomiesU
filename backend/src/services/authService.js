import crypto from "crypto";
import { Auth } from "../models/Auth.js";

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
            console.error(" Error en el registro:", error);
            throw error;
        }
    }

    static async login({ correo, password }, tableName) {
        try {
            // Buscar usuario
            const user = await Auth.findByEmail(correo, tableName);

            if (!user) {
                return { error: "Credenciales inválidas" };
            }

            // Verificar la contraseña con SHA-256 y el salt
            const hashedPassword = crypto.createHmac("sha256", user.Salt).update(password).digest("hex");

            if (hashedPassword !== user.Hash) {
                return { error: "Credenciales inválidas" };
            }

            return { message: "Inicio de sesión exitoso", userId: user.ID };
        } catch (error) {
            console.error(" Error en el login:", error);
            throw error;
        }
    }
}
