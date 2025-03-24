import crypto from "crypto";
import bcrypt from "bcryptjs";
import { findUserByEmail, updatePassword } from "../models/User.js";
import { createPasswordResetToken, getEmailByToken, deleteToken } from "../models/PasswordReset.js";
import { sendResetEmail } from "../services/emailService.js";

//En esta función lo que se hace es enviar un correo con un token generado aquí mismo
//Luego se encripta y se revisa que el token que ingresa el usuario es el mismo que le llego al correo
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    console.log("📩 Email recibido:", email);

    try {
        if (!email) {
            return res.status(400).json({ message: "El correo es requerido" });
        }

        const emailNormalized = email.trim().toLowerCase();
        const user = await findUserByEmail(emailNormalized);

        console.log("👤 Usuario encontrado:", user);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // 📌 1. Generar un token seguro (original)
        const token = crypto.randomBytes(32).toString("hex");
        
        // 📌 2. Hashear el token antes de guardarlo en la BD
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        console.log("🔑 Token generado (sin encriptar, enviado al usuario):", token);
        console.log("🔒 Token hasheado (guardado en la BD):", hashedToken);


        console.log("🔑 Token generado:", token);
        console.log("🔒 Token encriptado:", hashedToken);

        // 📌 3. Guardar el token en la base de datos (solo el hash)
        await createPasswordResetToken(emailNormalized, hashedToken);
        console.log("✅ Token guardado en la base de datos");

        // 📌 4. Enviar el token ORIGINAL al usuario por correo
        await sendResetEmail(emailNormalized, token);
        console.log("📨 Correo de recuperación enviado a:", emailNormalized);

        return res.json({ message: "Revisa tu correo para cambiar la contraseña." });
    } catch (error) {
        console.error("❌ Error en forgotPassword:", error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

// 📌 2. Restablecer la contraseña
export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    console.log("🔑 Token recibido en resetPassword:", token);

    try {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        console.log("🔒 Token hasheado antes de buscarlo en BD:", hashedToken);

        const email = await getEmailByToken(hashedToken);
        if (!email) return res.status(400).json({ message: "Token inválido o expirado" });
        console.log("✅ Token válido, actualizando contraseña para:", email);

        // 🔹 Generar nuevo salt y hash con SHA-256
        const newSalt = crypto.randomBytes(16).toString("hex");  // 16 bytes es suficiente
        const hashedPassword = crypto.createHmac("sha256", newSalt).update(password).digest("hex");

        // 🔹 Actualizar en la base de datos
        await updatePassword(email, hashedPassword, newSalt);
        await deleteToken(email);

        return res.json({ message: "Contraseña actualizada correctamente." });
    } catch (error) {
        console.error("❌ Error en resetPassword:", error);
        return res.status(500).json({ message: "Error en el servidor del reset password" });
    }
};
