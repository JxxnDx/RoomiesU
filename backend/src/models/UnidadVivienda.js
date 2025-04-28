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

export const getAllUnidades = async (id_admin) => {
  try {
    let query = "SELECT * FROM unidad_vivienda";
    let params = [];
    
    // Si hay un ID de admin, filtra por él
    if (id_admin && !isNaN(id_admin)) {
      query += " WHERE Id_Admin = ?";
      params.push(id_admin);
    }
    
    const [rows] = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.error("❌ Error al obtener unidades:", error);
    throw new Error("Error al obtener las unidades de vivienda");
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
  