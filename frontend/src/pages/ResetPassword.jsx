import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { COLORS } from '../constants/styles';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:4000/auth/reset-password/${token}`, { password });
            setMessage("Contraseña cambiada correctamente.");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setMessage("Error al cambiar la contraseña.");
        }
    };

    return (
        <div className={`p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg`}>
            <h2 className="text-xl font-bold text-teal-600">Nueva contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    className="w-full p-2 mt-2 bg-[#f1faf9] border border-gray-500 rounded"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={`w-full ${COLORS["light_secundary"]} hover:bg-[#018ab0] text-white font-bold mt-4 p-2 rounded`}>Restablecer</button>
            </form>
            {message && <p className="text-teal-600 mt-2">{message}</p>}
        </div>
    );
};

export default ResetPassword;
