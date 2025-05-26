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

  export const crearReseñaByStudent = async ( Reseña) => {
    try{
    const {
      Id_Estudiante,
      Id_Habitacion,
      Titulo,
      Descripcion,
      Estado, 
      Created_at,
      Puntuacion
    } = Reseña;
  
    const [result] = await pool.query(
      `INSERT INTO reseña_habitacion
       (Id_Estudiante, Id_Habitacion, Titulo, Descripcion, Estado, Created_at, Puntuacion) 
       VALUES (?, ?, ?, ?, ?, ?,?)`,
      [Id_Estudiante, Id_Habitacion, Titulo, Descripcion, Estado, Created_at,Puntuacion]
    );
  
   return {
        success: true,
        message: `Reseña de habitación creada correctamente`,
        changes: result.affectedRows
      };
  }catch(error){
    console.error("❌ Error al crear la reseña por parte del estudiante", error);
    throw error;
  }

  };


   export const crearReseñaByAdmin = async ( Reseña) => {
    try{
    const {
      Id_Estudiante,
      Id_Admin,
      Titulo,
      Descripcion,
      Estado, 
      Created_at,
      Puntuacion
    } = Reseña;
  
    const [result] = await pool.query(
      `INSERT INTO reseña_estudiante
       (Id_Estudiante, Id_Admin, Titulo, Descripcion, Estado, Created_at, Puntuacion) 
       VALUES (?, ?, ?, ?, ?, ?,?)`,
      [Id_Estudiante, Id_Admin, Titulo, Descripcion, Estado, Created_at,Puntuacion]
    );
  
   return {
        success: true,
        message: `Reseña de estudiante creada correctamente`,
        changes: result.affectedRows
      };
  }catch(error){
    console.error("❌ Error al crear la reseña por el estudiante", error);
    throw error;
  }

  };


    export const getReseñasDeEstudiante = async (Id_Estudiante) => {
   try{
    const [rows] = await pool.query(
        `SELECT r.Titulo, r.Descripcion, r.Puntuacion, r.Created_at, r.Id_Reseña_Estudiante , e.Nombre, e.Apellido
        FROM reseña_estudiante r
        INNER JOIN administrador e ON r.Id_Admin = e.Id_Administrador
         WHERE Id_Estudiante = ? AND Estado='habilitado'`,
      [Id_Estudiante]
    );
    return rows;
   } catch(error){
    console.error("❌ Error al obtener los estudiantes para reseñar de este admin ", error);
    throw error;
   } 
  }

   export const getReseñasDeHabitacion = async (Id_Habitacion) => {
   try{
    const [rows] = await pool.query(
        `SELECT r.Titulo, r.Descripcion, r.Puntuacion, r.Created_at, r.Id_Reseña_Habitacion, e.Nombre, e.Apellido 
        FROM reseña_habitacion r 
        INNER JOIN estudiante e ON r.Id_Estudiante=e.Id_Estudiante 
        WHERE Id_Habitacion = ? AND Estado='habilitado'`,
      [Id_Habitacion]
    );
    return rows;
   } catch(error){
    console.error("❌ Error al obtener los estudiantes para reseñar de este admin ", error);
    throw error;
   } 
  }


