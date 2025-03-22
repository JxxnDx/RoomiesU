import { pool } from "../config/db.js";

//En el models se hace las consultas
export const getAllUsers = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios");
        return rows;
    } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
        throw error;
    }
};

export const findUserByEmail = async (email) => {
    try {
        const [rows] = await pool.query(
            `SELECT correo FROM estudiante WHERE correo = ? 
             UNION 
             SELECT correo FROM administrador WHERE correo = ?`,
            [email, email]
        );

        console.log("📝 Resultado de la consulta:", rows); // 👀 Ver qué devuelve la BD

        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("❌ Error en findUserByEmail:", error);
        throw error;
    }
};

// Actualizar contraseña del usuario
export const updatePassword = async (email, hashedPassword) => {
    await pool.query("UPDATE estudiante SET password = ? WHERE correo = ?", [hashedPassword, email]);
    await pool.query("UPDATE administrador SET password = ? WHERE correo = ?", [hashedPassword, email]);
};