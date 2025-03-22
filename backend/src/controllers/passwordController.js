import crypto from "crypto";
import bcrypt from "bcryptjs";
import { findUserByEmail, updatePassword } from "../models/User.js";
import { createPasswordResetToken, getEmailByToken, deleteToken } from "../models/PasswordReset.js";
import { sendResetEmail } from "../services/emailService.js";

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    console.log("📩 Email recibido:", email); // 👀 Verificar que llega bien

    try {
        if (!email) {
            return res.status(400).json({ message: "El correo es requerido" });
        }

        const emailNormalized = email.trim().toLowerCase();
        const user = await findUserByEmail(emailNormalized);

        console.log("👤 Usuario encontrado:", user); // 👀 Revisar qué devuelve

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // 📌 Generar token seguro
        const token = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        console.log("🔑 Token generado:", token); // 👀 Verificar token original
        console.log("🔒 Token encriptado:", hashedToken); // 👀 Verificar hash

        // 📌 Guardar token en la base de datos
        await createPasswordResetToken(emailNormalized, hashedToken);
        console.log("✅ Token guardado en la base de datos");

        // 📌 Enviar correo de recuperación
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

    try {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const email = await getEmailByToken(hashedToken);
        if (!email) return res.status(400).json({ message: "Token inválido o expirado" });

        // Hashear nueva contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Actualizar contraseña y eliminar token
        await updatePassword(email, hashedPassword);
        await deleteToken(email);

        return res.json({ message: "Contraseña actualizada correctamente." });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor" });
    }
};
