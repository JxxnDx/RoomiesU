import { pool } from "../config/db.js";

//En este modelo obtengo todas las unidades para un Admin en especifico
export const getUnidadAdminById = async (id) => {
    try{const [rows] = await pool.query(
      "SELECT Id_Unidad, Nombre FROM unidad_vivienda WHERE Id_Admin = ?", 
      [id]
    );
    return rows;
   } catch(error){
    console.error("❌ Error al obtener la unidad del Admin:", error);
    throw error;
   }
  };

  export const createHabitacion = async ( roomData) => {
    const {
      Precio,
      Descripcion,
      Requisitos,
      Id_Admin,
      Id_Unidad,
      Img_url
    } = roomData;
  
    const [result] = await pool.query(
      `INSERT INTO habitacion 
       (Precio, Descripcion, Requisitos, Id_Admin, Id_Unidad, Img_url) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [Precio, Descripcion, Requisitos, Id_Admin, Id_Unidad, Img_url]
    );
  
    return result.insertId;
  };
  