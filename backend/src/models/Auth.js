import { pool } from "../config/db.js";

export class Auth {
    // Buscar usuario por correo
    static async findByEmail(email, tableName) {
        const [rows] = await pool.query(`SELECT * FROM ${tableName} WHERE Correo = ?`, [email]);
        return rows.length > 0 ? rows[0] : null;
    }

    // Registrar un nuevo usuario
    static async create(data, tableName) {
        const { nombre, apellido, identificacion, correo, salt, hash, telefono, edad, descripcion } = data;
        const query = `INSERT INTO ?? (Nombre, Apellido, Identificacion, Correo, Salt, Hash, Telefono, Edad, Descripcion, IsAvailable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await pool.query(query, [tableName, nombre, apellido, identificacion, correo, salt, hash, telefono, edad, descripcion, 1]);
        return result.insertId;
    }

    // Buscar usuario por ID
    static async findById(id, tableName) {
        // console.log("🔎 Buscando usuario con:", { id, tableName });
    
        if (!id || !tableName) {
            throw new Error("ID o nombre de tabla inválidos");
        }
    
        let idField = tableName === "estudiante" ? "Id_Estudiante" : "Id_Administrador";
    
        const query = `SELECT ${idField} AS id, Nombre, Apellido, Correo, Telefono, Edad, Descripcion FROM ?? WHERE ${idField} = ?`;
        
        // console.log("📝 Consulta SQL:", query, [tableName, id]);
    
        const [rows] = await pool.query(query, [tableName, id]);
    
        // console.log("🔍 Resultado de la consulta:", rows);  // 👈 Verifica aquí
    
        return rows.length > 0 ? rows[0] : null;
    }
    
    
}
