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

  export const getHabitacionesforStudents = async ({ sector, ordenPrecio }) => {
    try{
      let query = `
      SELECT h.Id_Habitacion, h.Precio, h.Descripcion, h.Requisitos, h.Img_url, h.estado, u.Direccion, s.Nombre as Nombre_Sector 
      FROM habitacion h JOIN unidad_vivienda u ON h.Id_Unidad = u.Id_Unidad 
      JOIN sector s ON u.Id_Sector= s.Id_Sector WHERE h.estado='habilitado'`

      const values = [];

      if (sector) {
        query += " AND s.Nombre LIKE ?";
        values.push(`%${sector}%`);
      }
  
      const ordenValido = ['asc', 'desc'];
      if (ordenValido.includes(ordenPrecio)) {
        const orden = ordenPrecio.toUpperCase();
        query += ` ORDER BY h.Precio ${orden}, h.Id_Habitacion ${orden}`;
      }

      //Esto es para DEBUG
      // let debugQuery = query;
      // values.forEach(val => {
      // debugQuery = debugQuery.replace('?', `'${val}'`);
      // });
      // console.log("🧪 Query completa:", debugQuery);
      const [rows] = await pool.query(query, values);
      return rows;
      
    
   } catch(error){
    console.error("❌ Error al obtener las habitaciones", error);
    throw error;
   }
  };


  
  