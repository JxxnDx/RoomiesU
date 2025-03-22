import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// 🔧 Configurar el transporte de correo
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // ⚠️ Mantener en false porque Gmail usa STARTTLS en el puerto 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false // Deshabilita la verificación del certificado (evita errores SSL)
    },
});

console.log("📡 Conectando a Gmail SMTP...");
console.log(`🔹 Host: ${process.env.SMTP_HOST}`);
console.log(`🔹 Puerto: ${process.env.SMTP_PORT}`);
console.log(`🔹 Usuario: ${process.env.SMTP_USER}`);

// 🔍 Verificar conexión al servidor SMTP
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Error en la conexión SMTP:", error);
    } else {
        console.log("✅ Conexión SMTP exitosa.");
    }
});

// 📩 Función para enviar el correo
export const sendResetEmail = async (email, token) => {
    console.log(`📨 Intentando enviar correo a: ${email}`);

    const resetLink = `http://localhost:5173/reset-password/${token}`;
    const mailOptions = {
        from: `"Soporte RoomiesU" <${process.env.SMTP_USER}>`,  // 💡 Asegura que el remitente sea el mismo del usuario SMTP
        to: email,
        subject: "🔐 Recuperación de Contraseña",
        html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
               <a href="${resetLink}" target="_blank">${resetLink}</a>`,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email enviado con éxito a ${email}:`, info.response);
    } catch (error) {
        console.error("❌ Error al enviar email:", error);
    }
};
