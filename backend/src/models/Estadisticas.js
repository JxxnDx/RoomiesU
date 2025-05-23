import { pool } from "../config/db.js";

  export const obtenerEstadisticas = async (Id_Admin) => {
   try{
    const [rows] = await pool.query(
        ` SELECT 
         (SELECT COUNT(*) FROM habitacion h WHERE h.Id_Admin = ?) AS Total_Habitaciones,
         (SELECT COUNT(*) FROM habitacion h WHERE h.Id_Admin = ? AND h.estado = 'habilitado') AS Habitaciones_Disponibles,
         (SELECT COUNT(*) FROM habitacion h WHERE h.Id_Admin = ? AND h.estado = 'ocupado') AS Habitaciones_Ocupadas, 
         (SELECT COUNT(*) FROM aplicacion a INNER JOIN habitacion h ON a.Id_Habitacion=h.Id_Habitacion 
        WHERE h.Id_Admin = ? AND a.estado = 'pendiente') AS Aplicaciones_Pendientes`,
      [Id_Admin, Id_Admin, Id_Admin, Id_Admin]
    );
   
      
      return rows;
   } catch(error){
    console.error("❌ Error al obtener las estadisticas de aplicación", error);
    throw error;
   } 
  }