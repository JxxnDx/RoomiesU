import { pool } from "../config/db.js";

export const createPasswordResetToken = async (email, tokenHash) => {
    await pool.query(
        "REPLACE INTO password_resets (email, token) VALUES (?, ?)",
        [email, tokenHash]
    );
};

export const getEmailByToken = async (tokenHash) => {
    const [rows] = await pool.query(
        "SELECT email FROM password_resets WHERE token = ?",
        [tokenHash]
    );
    return rows.length ? rows[0].email : null;
};

export const deleteToken = async (email) => {
    await pool.query("DELETE FROM password_resets WHERE email = ?", [email]);
};
