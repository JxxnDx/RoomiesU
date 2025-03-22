import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
        <div className="p-6 max-w-md mx-auto bg-gray-900 text-white rounded-xl">
            <h2 className="text-xl font-bold">Nueva contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    className="w-full p-2 mt-2 bg-gray-800 border border-gray-600 rounded"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full bg-green-500 mt-4 p-2 rounded">Restablecer</button>
            </form>
            {message && <p className="text-green-400 mt-2">{message}</p>}
        </div>
    );
};

export default ResetPassword;
