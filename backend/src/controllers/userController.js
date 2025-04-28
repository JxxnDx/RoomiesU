import { pool } from '../config/db.js';
import { getAllSectors, createUnidad, getAllUnidades, getUnidadById, editarUnidad} from '../models/UnidadVivienda.js';
import { getAllUsers } from '../models/User.js';
import jwt from 'jsonwebtoken';


export const getUsersController = async (req, res) => {
    try {
        const users = await getAllUsers(); // Usa la función de User.js
        res.json(users);
    } catch (error) {
        console.error("❌ Error en la consulta SQL:", error);
        res.status(500).json({ error: error.message });
    }
};


export const getSectorController = async (req, res) => {
    try {
        const sectors = await getAllSectors(); 
        res.json(sectors);
    } catch (error) {
        console.error("❌ Error en la consulta SQL:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getUnidadByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const unidad = await getUnidadById(id);

    if (!unidad) {
      return res.status(404).json({ message: "Unidad no encontrada" });
    }

    res.json(unidad);
  } catch (error) {
    console.error("❌ Error en getUnidadByIdController:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

export const getUnidadController = async (req, res) => {
  try {
      let id_admin = null;
      
      // 1. Obtención flexible del token
      const token = req.cookies?.token || 
                   req.headers?.authorization?.split(' ')[1] || 
                   req.headers?.Authorization?.split(' ')[1];
      
      // 2. Extracción del ID del token
      if (token) {
          try {
            //Aquí lo que se hace es extraer el id del token(Se va a usar en otros controladores)
              // Decodifica sin verificar (para evitar errores por firma/expiración)
              const decoded = jwt.decode(token);
              
              // Versión flexible para obtener el ID
              id_admin = decoded?.userId || decoded?.id || decoded?.user?.id || decoded?.user_id;
              
              if (!id_admin && decoded) {
                  console.warn("Token no contiene ID reconocible. Contenido:", decoded);
              }
          } catch (error) {
              console.log("Error al decodificar token:", error.message);
          }
      }

      // 3. Obtención de datos
      const unidades = await getAllUnidades(id_admin);
      
      // 4. Respuesta
      res.json(
           unidades
          // debugInfo: {
          //     usedAdminId: id_admin,
          //     tokenReceived: !!token,
          //     tokenContents: token ? jwt.decode(token) : null
          // }
      );
      
  } catch (error) {
      console.error("Error en getUnidadController:", error);
      res.status(500).json({ 
          success: false,
          message: "Error al procesar la solicitud",
          ...(process.env.NODE_ENV === 'development' && {
              error: error.message,
              stack: error.stack
          })
      });
  }
};
//Este es el controlador del registro de Unidades de vivienda, devuelve el Id de la Unidad en caso exitoso
export const registrarUnidadController = async (req, res) => {
    try {
      const Id_Unidad = await createUnidad(req.body);
      res.status(201).json({
        message: 'Unidad registrada exitosamente',
        Id_Unidad
      });
    } catch (error) {
      console.error('Error al registrar unidad:', error.message);
      res.status(500).json({
        message: 'Error al registrar la unidad',
        error: error.message
      });
    }
  };


export const actualizarUnidad = async (req, res) => {
  try {
    const { id } = req.params; // Obtenemos el ID de la URL (ej: /unidades/:id)
    const datosActualizados = req.body; // Obtenemos los datos del body (JSON)

    // Validación básica: asegurarse de que el ID y los datos necesarios estén presentes
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID de unidad no válido" });
    }

    if (
      !datosActualizados.Nombre ||
      !datosActualizados.Direccion ||
      !datosActualizados.Tipo ||
      !datosActualizados.estado ||
      !datosActualizados.Id_sector
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Llamamos al modelo para actualizar la unidad
    const resultado = await editarUnidad(id, datosActualizados);

    // Verificamos si se actualizó correctamente
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Unidad no encontrada o sin cambios" });
    }

    // Respuesta exitosa
    res.status(200).json( datosActualizados );
  } catch (error) {
    console.error("❌ Error en el controlador (actualizarUnidad):", error);
    res.status(500).json({ error: "Error interno del servidor al actualizar la unidad" });
  }
};