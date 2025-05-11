import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COLORS, TEXT } from '../constants/styles';
import roomImage from "../../public/fondo_roomiesu.webp";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correo || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const endpoint = role === "admin" ? "/auth/login/admin" : "/auth/login/student";

    try {
      const response = await axios.post(
        `http://localhost:4000${endpoint}`,
        { correo, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Asegura que las cookies se envíen y reciban
        }
      );

      // Eliminamos localStorage porque estamos usando cookies
      navigate(role === "admin" ? "/admindashboard" : "/studenthome");
    } catch (err) {
      setError("Credenciales incorrectas o usuario no encontrado.");
    }
  };

  return (
    <div className={`flex flex-row items-center justify-center h-auto w-auto ${COLORS["light_primary"]}` }>
       <div className="p-10 flex flex-col space-y-6">
        <h1 className="text-6xl font-bold text-teal-600 drop-shadow-lg">RoomiesU</h1>
        <img
          src={roomImage}
          alt="RoomiesU"
          className="w-80 sm:w-96 md:w-[400px] transition-all duration-500 hover:scale-[1.05]"
        />
      </div>

      <div className={`text-gray-800 p-6 rounded-lg shadow-lg bg-white w-md`}>
      <h2 className="text-2xl text-[#01b09e] font-bold text-center">Iniciar Sesión</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="blocktext-sm">Correo Electrónico</label>
          <input
            type="email"
            className={`w-full p-2 mt-1 rounded ${COLORS["light_primary"]} border border-gray-600 focus:outline-none focus:border-[#01b09e]`}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="mb-4 relative">
          <label className="blocktext-sm">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            className={`w-full p-2 mt-1 rounded ${COLORS["light_primary"]} border border-gray-600 focus:outline-none focus:border-[#01b09e] pr-10`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 top-11 transform -translate-y-1/2 text-gray-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🔒" : "👁️"}
          </button>
        </div>

        <div className="mb-4">
          <label className="blocktext-sm">Selecciona tu rol</label>
          <select
            className={`w-full p-2 mt-1 rounded ${COLORS["light_primary"]} border border-gray-600 focus:outline-none focus:border-[#01b09e]`}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Estudiante</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full ${COLORS["light_secundary"]} hover:bg-[#018ab0] text-white font-bold py-2 px-4 rounded transition`}
        >
          Iniciar Sesión
        </button>

        <p className="text-sm text-center mt-4">
          ¿No tienes una cuenta?{" "}
          <span
            className="text-[#01b09e] hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Regístrate aquí
          </span>
        </p>

        <p className="text-sm text-center mt-2">
          <span
            className="text-[#01b09e] hover:underline cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Recuperar contraseña
          </span>
        </p>
      </form>
    </div>
    </div>
  );
};

export default Login;
