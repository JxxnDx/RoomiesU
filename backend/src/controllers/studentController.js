import { getHabitacionesforStudents } from "../models/Habitacion.js";

export const getHabitacionesForStudentsController = async (req, res) => {
    try {
        const habitaciones = await getHabitacionesforStudents(); 
        res.json(habitaciones);
    } catch (error) {
        console.error("❌ Error en la consulta SQL:", error);
        res.status(500).json({ error: error.message });
    }

};