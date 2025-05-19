import { useState } from "react";
import axios from "axios";
import { COLORS } from '../constants/styles';

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
        <div className={`p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg`}>
            <h2 className="text-xl font-bold text-teal-600">Recuperar contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="w-full p-2 mt-2 bg-[#f1faf9] border border-gray-500 rounded"
                    placeholder="Tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className={`w-full ${COLORS["light_secundary"]} hover:bg-[#018ab0] text-white font-bold mt-4 p-2 rounded`}>Enviar enlace</button>
            </form>
            {message && <p className="text-teal-600 mt-2">{message}</p>}
        </div>
    );
};

export default ForgotPassword;
