import { pool } from "../config/db.js";

export const crearAplicacion = async ( AplicacionData) => {
    try{
    const {
      Id_Estudiante,
      Id_Habitacion,
      Correo_Estudiante,
      Descripcion,
      Estado, 
      Fecha_Creacion
    } = AplicacionData;
  
    const [result] = await pool.query(
      `INSERT INTO aplicacion
       (Id_Estudiante, Id_Habitacion, Correo_Estudiante, Descripcion, Estado, Fecha_Creacion) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [Id_Estudiante, Id_Habitacion, Correo_Estudiante, Descripcion, Estado, Fecha_Creacion]
    );
  
    return result.insertId;
  }catch(error){
    console.error("❌ Error al obtener la información de aplicación", error);
    throw error;
  }

  };

  
    export const getAplicacionesByStudent = async (Id_Estudiante ) => {
   try{
    const [rows] = await pool.query(
        `SELECT * FROM aplicacion WHERE Id_Estudiante = ?`,
      [Id_Estudiante]
    );
    return rows;
   } catch(error){
    console.error("❌ Error al obtener las aplicaciones para este estudiante", error);
    throw error;
   } 
  }


   export const getAplicacionesByAdmin = async (Id_Admin ) => {
   try{
    const [rows] = await pool.query(
        `SELECT A.* FROM aplicacion a INNER JOIN habitacion 
        h ON a.Id_Habitacion= h.Id_Habitacion 
        WHERE a.Estado= 'pendiente' AND h.Id_Admin= ?`,
      [Id_Admin]
    );
    return rows;
   } catch(error){
    console.error("❌ Error al obtener las aplicaciones para este administrador", error);
    throw error;
   } 
  }

    export const actualizarAplicacion = async (Id_Aplicacion, Estado) => {
   try{
    const [rows] = await pool.query(
        ` UPDATE aplicacion 
        SET Estado = ?
        WHERE Id_Aplicacion = ?`,
      [Estado, Id_Aplicacion]
    );
   if (rows.affectedRows === 0) {
        throw new Error('Error inesperado: No se pudo actualizar el estado o no se encontró');
      }
      
      return {
        success: true,
        message: `Aplicación ${Id_Aplicacion} actualizada correctamente`,
        changes: rows.affectedRows
      };
   } catch(error){
    console.error("❌ Error al cambiar el estado de la aplicación", error);
    throw error;
   } 
  }

     export const getAplicacionesAceptadasByAdmin = async (Id_Admin ) => {
   try{
    const [rows] = await pool.query(
        `SELECT a.Correo_Estudiante, a.Id_Habitacion, a.Id_Estudiante FROM aplicacion a INNER JOIN habitacion h 
        ON a.Id_Habitacion = h.Id_Habitacion WHERE a.Estado='aceptada' AND h.Id_Admin = ?`,
      [Id_Admin]
    );
    return rows;
   } catch(error){
    console.error("❌ Error al obtener las aplicaciones aceptadas para este admin", error);
    throw error;
   } 
  }


