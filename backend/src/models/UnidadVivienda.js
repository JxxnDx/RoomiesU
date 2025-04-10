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


export const createUnidad = async (data) => {
    const {
      nombre,
      direccion,
      tipo,
      id_sector,
      id_admin,
      estado  
    } = data;
  
    const query = `
      INSERT INTO unidad_vivienda (Nombre, Direccion, Tipo, Id_Sector, Id_Admin, estado)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    const [result] = await pool.query(query, [
      nombre,
      direccion,
      tipo,
      id_sector,
      id_admin,
      estado
    ]);
  
    return result.insertId;
  };
  