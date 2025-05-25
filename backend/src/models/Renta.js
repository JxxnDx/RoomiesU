import { pool } from "../config/db.js";

export const crearRenta = async ( renta) => {
    const {
      Id_Estudiante,
    Id_Habitacion,
    Fecha_inicio,
    Fecha_fin,
    Monto_Renta,
    Estado,
    Estado_Pago,
    Id_Admin
    } = renta;

    // Validaciones básicas
  if (!Id_Estudiante || !Id_Habitacion || !Fecha_inicio || !Fecha_fin || !Monto_Renta) {
    throw new Error('Faltan campos obligatorios');
  }

  if (new Date(Fecha_inicio) >= new Date(Fecha_fin)) {
    throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
  }
  
     try {
    // Verificamos si hay una renta activa para esa habitación
    const [rows] = await pool.execute(
      `SELECT * FROM renta 
       WHERE Id_Habitacion = ? 
       AND estado IN ('en_curso', 'pendiente')
       AND NOT (Fecha_fin < ? OR Fecha_inicio > ?)`,
      [Id_Habitacion, Fecha_inicio, Fecha_fin]
    );

    if (rows.length > 0) {
      return {
        success: false,
        status: 409,
        message: 'Ya existe una renta activa para esa habitación en el rango de fechas indicado.'
      };
    }

    // Insertar nueva renta si no hay traslape
    const [result] = await pool.execute(
      `INSERT INTO renta 
      (Id_Estudiante, Id_Habitacion, Fecha_inicio, Fecha_fin, Estado_Pago, Monto_Renta, Id_Admin, Estado) 
      VALUES (?, ?, ?, ?, ?, ?,?,?)`,
      [Id_Estudiante, Id_Habitacion, Fecha_inicio, Fecha_fin, Estado_Pago, Monto_Renta,Id_Admin, Estado]
    );

    return { 
      success: true, 
      message: 'Renta creada correctamente', 
      id: result.insertId 
    };

  } catch (error) {
    console.error('Error al crear la renta:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
  };


   export const getRentasByAdmin = async (Id_Admin ) => {
   try{
    const [rows] = await pool.query(
        `SELECT r.Id_Renta, r.Fecha_inicio, r.Fecha_fin, r.Estado, e.Correo, r.Id_Habitacion,r.Monto_Renta, r.Estado_Pago FROM renta r 
        INNER JOIN estudiante e ON r.Id_Estudiante= e.Id_Estudiante WHERE r.Id_Admin = ? AND r.Estado IN ('pendiente', 'aceptada');`,
      [Id_Admin]
    );
    return rows;
   } catch(error){
    console.error("❌ Error al obtener las rentas en curso ", error);
    throw error;
   } 
  }

     export const getRentasByStudent = async (Id_Estudiante ) => {
   try{
    const [rows] = await pool.query(
        `SELECT r.Fecha_inicio, r.Fecha_fin, r.Estado, a.Correo, r.Id_Habitacion,r.Monto_Renta, r.Estado_Pago 
         FROM renta r INNER JOIN administrador a ON r.Id_Admin= a.Id_Administrador 
         WHERE r.Id_Estudiante = 1 AND r.Estado IN ('pendiente', 'aceptada')`,
      [Id_Estudiante]
    );
    return rows;
   } catch(error){
    console.error("❌ Error al obtener las rentas en curso ", error);
    throw error;
   } 
  }

  export const actualizarRentaByAdmin = async (Id_Renta, Estado) => {
   try{
    const [rows] = await pool.query(
        ` UPDATE renta 
        SET Estado = ?
        WHERE Id_Renta = ?`,
      [Estado, Id_Renta]
    );
   if (rows.affectedRows === 0) {
        throw new Error('Error inesperado: No se pudo actualizar el estado o no se encontró');
      }
      
      return {
        success: true,
        message: `Renta ${Id_Renta} actualizada correctamente`,
        changes: rows.affectedRows
      };
   } catch(error){
    console.error("❌ Error al cambiar el estado de la renta", error);
    throw error;
   } 
  }
  
  