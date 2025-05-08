import { getUnidadAdminById, createHabitacion } from "../models/Habitacion.js";
import jwt from "jsonwebtoken";
import cloudinary from '../config/cloudinary.js';


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


