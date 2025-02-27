import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();


// Credenciales de la base de datos
export const pool = createPool({
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || "roomies_test",
});