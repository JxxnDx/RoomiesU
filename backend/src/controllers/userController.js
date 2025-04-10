import { pool } from '../config/db.js';
import { getAllSectors, createUnidad } from '../models/UnidadVivienda.js';
import { getAllUsers } from '../models/User.js';

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