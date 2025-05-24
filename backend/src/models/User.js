import { pool } from "../config/db.js";

//En el models se hace las consultas
export const getAllUsers = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios");
        return rows;
    } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
        throw error;
    }
};

export const findUserByEmail = async (email) => {
    try {
        const [rows] = await pool.query(
            `SELECT correo FROM estudiante WHERE correo = ? 
             UNION 
             SELECT correo FROM administrador WHERE correo = ?`,
            [email, email]
        );

        console.log("📝 Resultado de la consulta:", rows); // 👀 Ver qué devuelve la BD

        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("❌ Error en findUserByEmail:", error);
        throw error;
    }
};

export const updatePassword = async (email, newHash, newSalt) => {
    try {
        // Verificar en qué tabla está el usuario
        const [estudiante] = await pool.query("SELECT Correo FROM estudiante WHERE Correo = ?", [email]);
        const [administrador] = await pool.query("SELECT Correo FROM administrador WHERE Correo = ?", [email]);

        if (estudiante.length > 0) {
            await pool.query("UPDATE estudiante SET Hash = ?, Salt = ? WHERE Correo = ?", [newHash, newSalt, email]);
            console.log(`✅ Contraseña actualizada para ${email} en la tabla estudiante.`);
        } else if (administrador.length > 0) {
            await pool.query("UPDATE administrador SET Hash = ?, Salt = ? WHERE Correo = ?", [newHash, newSalt, email]);
            console.log(`✅ Contraseña actualizada para ${email} en la tabla administrador.`);
        } else {
            console.warn(`⚠ No se encontró el usuario ${email} en ninguna tabla.`);
        }
    } catch (error) {
        console.error("❌ Error en updatePassword:", error);
        throw error;
    }
};

export const getInfoPerfil = async (rol, id) => {
  try {
    const tabla = (rol === 'estudiante') ? 'estudiante' : 'administrador';
    const id_tabla = (rol === 'estudiante') ? 'Id_Estudiante' : 'Id_Administrador';

    const query = `
      SELECT Nombre, Apellido, Identificacion, Telefono, Edad, Descripcion
      FROM ${tabla}
      WHERE ${id_tabla} = ?
    `;

    const [rows] = await pool.query(query, [id]);

    console.log("📝 Resultado de la consulta:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Error en getInfoPerfil", error);
    throw error;
  }
};