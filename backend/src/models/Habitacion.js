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
      Img_url,
      estado
    } = roomData;
  
    const [result] = await pool.query(
      `INSERT INTO habitacion 
       (Precio, Descripcion, Requisitos, Id_Admin, Id_Unidad, Img_url, estado) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [Precio, Descripcion, Requisitos, Id_Admin, Id_Unidad, Img_url, estado]
    );
  
    return result.insertId;
  };

  export const getHabitaciones = async (id) => {
    try{const [rows] = await pool.query(
      "SELECT * FROM habitacion WHERE Id_Admin = ?",
      [id]
    );
    return rows;
   } catch(error){
    console.error("❌ Error al obtener las habitaciones", error);
    throw error;
   }
  };

  export const getHabitacionesforStudents = async () => {
    try{const [rows] = await pool.query(
      "SELECT h.Id_Habitacion, h.Precio, h.Descripcion, h.Requisitos, h.Img_url, h.estado, u.Direccion FROM habitacion h JOIN unidad_vivienda u ON h.Id_Unidad = u.Id_Unidad WHERE h.estado='habilitado';"
    );
    return rows;
   } catch(error){
    console.error("❌ Error al obtener las habitaciones", error);
    throw error;
   }
  };


  
  