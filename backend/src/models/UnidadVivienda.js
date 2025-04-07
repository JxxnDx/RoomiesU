import { pool } from "../config/db.js";

//En el models se hace las consultas
export const getAllSectors = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM sector");
        return rows;
    } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
        throw error;
    }
};
