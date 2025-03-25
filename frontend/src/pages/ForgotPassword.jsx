import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/auth/forgot-password", { email });
            setMessage(res.data.message);
        } catch (error) {
            setMessage("Error al solicitar restablecimiento.");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-gray-900 text-white rounded-xl">
            <h2 className="text-xl font-bold">Recuperar contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="w-full p-2 mt-2 bg-gray-800 border border-gray-600 rounded"
                    placeholder="Tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="w-full bg-green-500 mt-4 p-2 rounded">Enviar enlace</button>
            </form>
            {message && <p className="text-green-400 mt-2">{message}</p>}
        </div>
    );
};

export default ForgotPassword;
