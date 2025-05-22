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
        query += " AND s.Id_Sector = ?";
        values.push(`${sector}`);
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


  export const getHabitacionById = async (id) => {
    try{const [rows] = await pool.query(
       "SELECT * FROM habitacion WHERE Id_Habitacion = ?",
     [id]
    );
    return rows;
   } catch(error){
    console.error("❌ Error al obtener la habitación", error);
    throw error;
   }
  };

  export const editarHabitacion = async ({
    Id_Habitacion,
    Precio,
    Descripcion,
    Requisitos,
    Id_Unidad,
    estado,
    Img_url
  }) => {
    try {
      // 1. Primero verifica si existe la habitación
      const [checkResult] = await pool.query(
        'SELECT Id_Habitacion FROM habitacion WHERE Id_Habitacion = ?', 
        [Id_Habitacion]
      );
  
      if (checkResult.length === 0) {
        throw new Error(`Habitación con ID ${Id_Habitacion} no existe`);
      }
  
      // 2. Si existe, procede con la actualización
      const query = `
        UPDATE habitacion 
        SET Precio = ?, Descripcion = ?, Requisitos = ?, 
            Id_Unidad = ?, estado = ?, Img_url = ?
        WHERE Id_Habitacion = ?`;
      
      const values = [Precio, Descripcion, Requisitos, Id_Unidad, estado, Img_url, Id_Habitacion];
      
      const [result] = await pool.query(query, values);
      
      if (result.affectedRows === 0) {
        throw new Error('Error inesperado: No se pudo actualizar la habitación');
      }
      
      return {
        success: true,
        message: `Habitación ${Id_Habitacion} actualizada correctamente`,
        changes: result.affectedRows
      };
      
    } catch (error) {
      console.error('Error en modelo editarHabitacion:', error);
      throw error;
    }
  };


  export const createServicio = async ( ServiceData) => {
    const {
      Id_Servicio,
      Id_Habitacion
    } = ServiceData;
  
    const [result] = await pool.query(
      `INSERT INTO servicio_pension 
       (Id_Servicio, Id_Habitacion) 
       VALUES (?, ?)`,
      [Id_Servicio, Id_Habitacion]
    );
  
    return result.insertId;
  };

    export const eliminarServicioHabitacion = async ( { Id_Servicio, Id_Habitacion }) => {
  
  
    const [result] = await pool.query(
      `DELETE FROM servicio_pension 
      WHERE Id_Servicio = ? AND Id_Habitacion = ? `,
      [Id_Servicio, Id_Habitacion]
    );
  
    return result.affectedRows;
  };

 export const getServicios = async (Id_Habitacion) => {
  try {
    const [rows] = await pool.query(
      `SELECT s.* 
       FROM servicio s
       WHERE NOT EXISTS (
         SELECT 1 
         FROM servicio_pension sp 
         WHERE sp.Id_Servicio = s.Id_Servicio
         AND sp.Id_Habitacion = ?
       )`,
      [Id_Habitacion]
    );
    return rows;
  } catch(error) {
    console.error("❌ Error al obtener los servicios", error);
    throw error;
  }
};

// Esta consulta esta así para verificar que el usuario no vaya a agregar dos veces el mismo servicio
//Verifica y solo trae los servicios que no registre esa habitación en servicio_pension
   export const getServiciosById = async (Id_Habitacion ) => {
   try{
    const [rows] = await pool.query(
        `SELECT sp.Id_Servicio, sp.Id_Habitacion, s.Nombre FROM servicio_pension sp 
        JOIN servicio s ON sp.Id_Servicio = s.Id_Servicio 
        WHERE Id_Habitacion = ?;`,
      [Id_Habitacion]
    );
    return rows;
   } catch(error){
    console.error("❌ Error al obtener los servicios de esta habitación", error);
    throw error;
   } 
  }


   export const getHabitacionByIdForVerHabitacion = async (id) => {
    try{const [rows] = await pool.query(
       "SELECT h.*, u.Direccion FROM habitacion h JOIN unidad_vivienda u ON h.Id_Unidad= u.Id_Unidad WHERE Id_Habitacion = ?",
     [id]
    );
    return rows;
   } catch(error){
    console.error("❌ Error al obtener la información habitación", error);
    throw error;
   }
  };


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

