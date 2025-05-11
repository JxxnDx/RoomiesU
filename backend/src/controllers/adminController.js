import { getUnidadAdminById, createHabitacion, getHabitaciones, getHabitacionById, editarHabitacion, createServicio, eliminarServicioHabitacion } from "../models/Habitacion.js";
import jwt from "jsonwebtoken";
import cloudinary from '../config/cloudinary.js';
import { pool } from "../config/db.js";


export const getUnidadAdminByIdController = async (req, res) => {
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
      const Id_unidades_Admin = await getUnidadAdminById(id_admin);

      if (!Id_unidades_Admin) {
        return res.status(404).json({ message: "Unidades no encontradas" });
      }
      
      // 4. Respuesta
      res.json(
           Id_unidades_Admin
          // debugInfo: {
          //     usedAdminId: id_admin,
          //     tokenReceived: !!token,
          //     tokenContents: token ? jwt.decode(token) : null
          // }
      );
      
  } catch (error) {
      console.error("Error en getUnidadAdminByIdController:", error);
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

export const getHabitacionesAdminByIdController = async (req, res) => {
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
      const Id_habitaciones_Admin = await getHabitaciones(id_admin);

      if (!Id_habitaciones_Admin) {
        return res.status(404).json({ message: "Habitaciones no encontradas" });
      }
      
      // 4. Respuesta
      res.json(
           Id_habitaciones_Admin
          // debugInfo: {
          //     usedAdminId: id_admin,
          //     tokenReceived: !!token,
          //     tokenContents: token ? jwt.decode(token) : null
          // }
      );
      
  } catch (error) {
      console.error("Error en getHabitacionesAdminByIdController:", error);
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



// Controlador para crear habitación
export const createHabitacionController = async (req, res) => {
  try {
    // Aseguramos que se haya subido una imagen mediante multer (validado en el middleware)
    const { Precio, Descripcion, Requisitos, Id_Admin, Id_Unidad, estado } = req.body;

    // Validación de campos obligatorios
    if (!Precio || !Descripcion || !Requisitos || !Id_Unidad || !req.file) {
      return res.status(400).json({ error: 'Faltan campos requeridos o imagen' });
    }

    // Subir la imagen a Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
      { folder: 'habitaciones' }
    );

    // Crear habitación en la base de datos
    const roomId = await createHabitacion({
      Precio,
      Descripcion,
      Requisitos,
      Id_Admin,
      Id_Unidad,
      Img_url: uploadResult.secure_url,
      estado
    });

    // Responder con éxito
    res.status(201).json({
      message: 'Habitación creada exitosamente',
      roomId,
      imageUrl: uploadResult.secure_url
    });

  } catch (error) {
    console.error('Error al crear habitación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getHabitacionByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const habitacion = await getHabitacionById(id);

    if (!habitacion) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }

    res.json(habitacion);
  } catch (error) {
    console.error("❌ Error en getHabitaciónByIdController:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

export const editarHabitacionController = async (req, res) => {
  try {
    const { id } = req.params;
    const { Precio, Descripcion, Requisitos, Id_Unidad, estado, currentImageUrl } = req.body;

    // Validación más detallada
    if (!Precio || !Descripcion || !Requisitos || !Id_Unidad || !currentImageUrl) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos',
        detalles: {
          Precio: !Precio ? 'Falta el precio' : 'OK',
          Descripcion: !Descripcion ? 'Falta la descripción' : 'OK',
          Requisitos: !Requisitos ? 'Faltan los requisitos' : 'OK',
          Id_Unidad: !Id_Unidad ? 'Falta la unidad' : 'OK',
          currentImageUrl: !currentImageUrl ? 'Falta la URL de la imagen actual' : 'OK'
        }
      });
    }

    let imageUrl = currentImageUrl;

    if (req.file) {
      try {
        const uploadResult = await cloudinary.uploader.upload(
          `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
          { folder: 'habitaciones' }
        );
        imageUrl = uploadResult.secure_url;
      } catch (cloudinaryError) {
        console.error('Error subiendo a Cloudinary:', cloudinaryError);
        return res.status(500).json({ error: 'Error al subir la imagen' });
      }
    }

    await editarHabitacion({
      Id_Habitacion: id,
      Precio,
      Descripcion,
      Requisitos,
      Id_Unidad,
      estado,
      Img_url: imageUrl
    });

    res.status(200).json({ 
      message: 'Habitación actualizada correctamente',
      imageUrl: imageUrl 
    });

  } catch (error) {
    console.error('❌ Error al actualizar habitación:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      detalle: error.message 
    });
  }
};

export const crearServicioController = async (req, res) => {
  try {
    const { id } = req.params;
    const { Id_Servicio} = req.body;

     // Validación completa
    if (!Id_Servicio || !id) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos',
        detalles: {
          Id_Servicio: !Id_Servicio ? 'Falta el Id_Servicio' : 'OK',
          Id_Habitacion: !id ? 'Falta el Id_Habitacion' : 'OK'
        }
      });
    }


    await createServicio({
      Id_Habitacion: id,
      Id_Servicio: Id_Servicio
    });

    res.status(200).json({ 
      message: 'Servicio creado correctamente'
    });

  } catch (error) {
    console.error('❌ Error al crear el servicio:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      detalle: error.message 
    });
  }
};


//El
export const eliminarServicioHabitacionController = async (req, res) => {
  try {
  const { Id_Habitacion, Id_Servicio} = req.params;

const eliminados = await eliminarServicioHabitacion({ Id_Habitacion, Id_Servicio });

if (eliminados === 0) {
  return res.status(404).json({ 
    error: 'Servicio no encontrado o ya fue eliminado' 
  });
}
     // Validación completa
    if (!Id_Servicio || !Id_Habitacion) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos',
        detalles: {
          Id_Servicio: !Id_Servicio ? 'Falta el Id_Servicio' : 'OK',
          Id_Habitacion: !Id_Habitacion ? 'Falta el Id_Habitacion' : 'OK'
        }
      });
    }


    await eliminarServicioHabitacion({
      Id_Habitacion: Id_Habitacion,
      Id_Servicio: Id_Servicio
    });

    res.status(200).json({ 
      message: 'Servicio eliminado correctamente'
    });

  } catch (error) {
    console.error('❌ Error al eliminar el servicio:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      detalle: error.message 
    });
  }
};



