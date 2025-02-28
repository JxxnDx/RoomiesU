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