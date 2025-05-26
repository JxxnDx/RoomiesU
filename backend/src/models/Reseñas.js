import { pool } from "../config/db.js";


  export const getHabitacionesParaReseñarByStudent = async (Id_Estudiante ) => {
   try{
    const [rows] = await pool.query(
        `SELECT r.Id_Habitacion, u.Direccion FROM renta r 
        INNER JOIN habitacion h ON r.Id_Habitacion=h.Id_Habitacion 
        INNER JOIN unidad_vivienda u ON h.Id_Unidad=u.Id_Unidad 
        WHERE r.Id_Estudiante = ? AND r.Estado IN ('en_curso', 'finalizada')`,
      [Id_Estudiante]
    );
    return rows;
   } catch(error){
    console.error("❌ Error al obtener las habitaciones para reseñar de este estudiante ", error);
    throw error;
   } 
  }


  export const getEstudiantesParaReseñarByAdmin = async (Id_Admin ) => {
   try{
    const [rows] = await pool.query(
        `SELECT DISTINCT r.Id_Estudiante, e.Correo FROM renta r 
        INNER JOIN estudiante e ON r.Id_Estudiante= e.Id_Estudiante 
        WHERE r.Id_Admin = ? AND r.Estado IN ('en_curso', 'finalizada')`,
      [Id_Admin]
    );
    return rows;
   } catch(error){
    console.error("❌ Error al obtener los estudiantes para reseñar de este admin ", error);
    throw error;
   } 
  }