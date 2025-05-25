import { getHabitacionesforStudents } from "../models/Habitacion.js";
import { getRentasByStudent } from "../models/Renta.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET ;

export const getHabitacionesForStudentsController = async (req, res) => {
    const { sector, ordenPrecio } = req.query;

    try {
      const habitaciones = await getHabitacionesforStudents({ sector, ordenPrecio });
      res.json(habitaciones);
    } catch (error) {
      console.error("❌ Error en la consulta SQL:", error);
      res.status(500).json({ error: error.message });
    }
};

export const getRentasByStudentController = async (req, res) => {
  try {
    let id_estudiante = null;

    const token = req.cookies?.token ||
                  req.headers?.authorization?.split(' ')[1] ||
                  req.headers?.Authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY); // Se Verifica firma y expiración más seguridad
      id_estudiante = decoded?.userId;

      if (!id_estudiante) {
        return res.status(401).json({ message: "Token inválido: no contiene un ID de administrador" });
      }

    } catch (error) {
      console.error("❌ Error al verificar token:", error);
      return res.status(401).json({ message: "Token inválido o expirado" });
    }

    const rentas = await getRentasByStudent(id_estudiante);

    if (!rentas) {
      return res.status(404).json({ message: "Rentas no encontradas" });
    }

    res.json(rentas);

  } catch (error) {
    console.error("❌ Error en getRentasByStudent:", error);
    res.status(500).json({ message: "Error interno" });
  }
};