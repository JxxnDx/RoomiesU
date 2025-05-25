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

  