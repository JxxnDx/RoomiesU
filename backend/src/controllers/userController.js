import { pool } from '../config/db.js';
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
