import { AuthService } from "../services/authService.js";

export const registerAdmin = async (req, res) => {
    try {
        const result = await AuthService.register(req.body, "administrador");

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        res.status(201).json({ message: "Admin registrado con éxito", userId: result.id });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const registerStudent = async (req, res) => {
    try {
        const result = await AuthService.register(req.body, "estudiante");

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        res.status(201).json({ message: "Estudiante registrado con éxito", userId: result.id });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const result = await AuthService.login(req.body, "administrador");

        if (result.error) {
            return res.status(401).json({ message: result.error });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const loginStudent = async (req, res) => {
    try {
        const result = await AuthService.login(req.body, "estudiante");

        if (result.error) {
            return res.status(401).json({ message: result.error });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
