import { pool } from "../config/db.js";

export class Auth {
    static async findByEmail(email, tableName) {
        const [rows] = await pool.query(`SELECT * FROM ${tableName} WHERE Correo = ?`, [email]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async create(data, tableName) {
        const { nombre, apellido, identificacion, correo, salt, hash, telefono, edad,descripcion } = data;
        const [result] = await pool.query(
            `INSERT INTO ${tableName} (Nombre, Apellido, Identificacion, Correo, Salt, Hash, Telefono, Edad, Descripcion, IsAvaible) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre, apellido, identificacion, correo, salt, hash, telefono, edad, descripcion, 1]
        );
        return result.insertId;
    }
}
