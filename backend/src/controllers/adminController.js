import { getUnidadAdminById, createHabitacion, getHabitaciones, 
getHabitacionById, editarHabitacion, createServicio, eliminarServicioHabitacion, getServicios, 
getServiciosById, getHabitacionByIdForVerHabitacion} from "../models/Habitacion.js";
import jwt from "jsonwebtoken";
import cloudinary from '../config/cloudinary.js';
import { pool } from "../config/db.js";
import { actualizarAplicacion, crearAplicacion, getAplicacionesByAdmin, getAplicacionesByStudent } from "../models/Aplicacion.js";
import { sendApplicationEmail } from "../services/emailService.js";
import { obtenerEstadisticas } from "../models/Estadisticas.js";



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

export const getServiciosController = async (req, res) => {
  try {
  
    const { Id_Habitacion} = req.params;
    const servicios = await getServicios(Id_Habitacion);

    if (!servicios) {
      return res.status(404).json({ message: "Servicios no encontrados" });
    }

    res.json(servicios);
  } catch (error) {
    console.error("❌ Error en getServiciosController:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

export const getServiciosByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const servicios = await getServiciosById(id);

    if (!servicios) {
      return res.status(404).json({ message: "Servicios no encontrados" });
    }

    res.json(servicios);
  } catch (error) {
    console.error("❌ Error en getServicioByIdController:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

export const getHabitacionByIdForVerHabitacionController = async (req, res) => {
  try {
    const { id } = req.params;

    const habitacion = await getHabitacionByIdForVerHabitacion(id);

    if (!habitacion) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }

    res.json(habitacion);
  } catch (error) {
    console.error("❌ Error en getHabitaciónByIdForVerHabitacionController:", error);
    res.status(500).json({ message: "Error interno" });
  }
};


export const crearAplicacionController = async (req, res) => {
  try {
    const { Id_Habitacion } = req.params;
    const { Descripcion } = req.body;
    let id_estudiante = null;
    let correo_estudiante = null;

    //  Validación de campos adicional a la del front para más seguridad
    if (!Id_Habitacion || isNaN(Id_Habitacion)) {
      return res.status(400).json({ message: "Id_Habitacion es obligatorio y debe ser un número válido" });
    }

    if (!Descripcion || typeof Descripcion !== "string" || Descripcion.trim() === "") {
      return res.status(400).json({ message: "La descripción no puede estar vacía" });
    }

    //  Obtenemos el token desde las cookies
    const token = req.cookies?.token ||
                  req.headers?.authorization?.split(' ')[1] ||
                  req.headers?.Authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
      const decoded = jwt.decode(token);

      id_estudiante = decoded?.userId || decoded?.id || decoded?.user?.id || decoded?.user_id;
      correo_estudiante = decoded?.correo;

      if (!id_estudiante) {
        return res.status(401).json({ message: "Token inválido: no contiene un ID de estudiante" });
      }

      if (!correo_estudiante) {
        return res.status(401).json({ message: "Token inválido: no contiene correo del estudiante" });
      }
    } catch (error) {
      console.error("❌ Error al decodificar token:", error);
      return res.status(400).json({ message: "Token mal formado o inválido" });
    }

    //  Creación objeto de aplicación
    const AplicacionData = {
      Id_Estudiante: id_estudiante,
      Correo_Estudiante: correo_estudiante,
      Id_Habitacion: parseInt(Id_Habitacion),
      Descripcion: Descripcion.trim(),
      Estado: 'pendiente',
      Fecha_Creacion: new Date()
    };

    // Guardar aplicación
    await crearAplicacion(AplicacionData);

    return res.status(200).json({ message: 'Aplicación creada correctamente' });

  } catch (error) {
    console.error("Error en crearAplicacionController:", error);
    return res.status(500).json({ message: "Error al crear la aplicación", error: error.message });
  }
};


export const getAplicacionesByStudentController = async (req, res) => {
  try {
    let id_estudiante = null;

    //  Obtenemos el token desde las cookies
    const token = req.cookies?.token ||
                  req.headers?.authorization?.split(' ')[1] ||
                  req.headers?.Authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
      const decoded = jwt.decode(token);

      id_estudiante = decoded?.userId;
      

      if (!id_estudiante) {
        return res.status(401).json({ message: "Token inválido: no contiene un ID de estudiante" });
      }

    
    } catch (error) {
      console.error("❌ Error al decodificar token:", error);
      return res.status(400).json({ message: "Token mal formado o inválido" });
    }
    const aplicaciones = await getAplicacionesByStudent(id_estudiante);

    if (!aplicaciones) {
      return res.status(404).json({ message: "Aplicaciones no encontrados" });
    }

    res.json(aplicaciones);
  } catch (error) {
    console.error("❌ Error en getAplicacionesByStudent:", error);
    res.status(500).json({ message: "Error interno" });
  }
};


export const getAplicacionesByAdminController = async (req, res) => {
  try {
    let id_admin = null;

    //  Obtenemos el token desde las cookies
    const token = req.cookies?.token ||
                  req.headers?.authorization?.split(' ')[1] ||
                  req.headers?.Authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
      const decoded = jwt.decode(token);

      id_admin = decoded?.userId;
      

      if (!id_admin) {
        return res.status(401).json({ message: "Token inválido: no contiene un ID de administrador" });
      }

    
    } catch (error) {
      console.error("❌ Error al decodificar token:", error);
      return res.status(400).json({ message: "Token mal formado o inválido" });
    }
    const aplicaciones = await getAplicacionesByAdmin(id_admin);

    if (!aplicaciones) {
      return res.status(404).json({ message: "Aplicaciones no encontrados" });
    }

    res.json(aplicaciones);
  } catch (error) {
    console.error("❌ Error en getAplicacionesByAdmin:", error);
    res.status(500).json({ message: "Error interno" });
  }
};


export const actualizarAplicacionController = async (req, res) => {
  const { id } = req.params;
  const { accion } = req; // Se esta seteando desde la ruta

  const estado = accion === 'aceptar' ? 'aceptada' : 'rechazada';

  try {
    const resultado = await actualizarAplicacion(id, estado);
    if (resultado.changes === 0) {
    return res.status(404).json({ error: 'Aplicación no encontrada' });
    }
    res.json({ mensaje: `Aplicación ${estado}` });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
};


export const sendEmailApplicationController = async (req, res) => {
    const { email } = req.body;

    console.log("📩 Email recibido:", email);

    try {
        if (!email) {
            return res.status(400).json({ message: "El correo es requerido" });
        }

        // Enviar el email al usuario
        await sendApplicationEmail(email);
        // console.log("📨 Correo de aplicación enviado a:", email);

        return res.json({ message: "Revisa tu correo para enterarte de los cambios." });
    } catch (error) {
        console.error("❌ sendEmailApplicationController ", error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};


export const getEstadisticasByAdminController = async (req, res) => {
  try {
    let id_admin = null;

    //  Obtenemos el token desde las cookies
    const token = req.cookies?.token ||
                  req.headers?.authorization?.split(' ')[1] ||
                  req.headers?.Authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
      const decoded = jwt.decode(token);

      id_admin = decoded?.userId;
      

      if (!id_admin) {
        return res.status(401).json({ message: "Token inválido: no contiene un ID de administrador" });
      }

    
    } catch (error) {
      console.error("❌ Error al decodificar token:", error);
      return res.status(400).json({ message: "Token mal formado o inválido" });
    }
    const estadisticas = await obtenerEstadisticas(id_admin);

    if (!estadisticas) {
      return res.status(404).json({ message: "Estadisticas no encontrados" });
    }

    res.json(estadisticas);
  } catch (error) {
    console.error("❌ Error en getEstadisticasByAdminController", error);
    res.status(500).json({ message: "Error interno" });
  }
};