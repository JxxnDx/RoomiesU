import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="bg-gray-900/75 text-white p-6 rounded-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-300 text-sm">Correo Electrónico</label>
          <input
            type="email"
            className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-500"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-300 text-sm">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-500 pr-10"
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
          <label className="block text-gray-300 text-sm">Selecciona tu rol</label>
          <select
            className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Estudiante</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Iniciar Sesión
        </button>

        <p className="text-sm text-center mt-4">
          ¿No tienes una cuenta?{" "}
          <span
            className="text-green-400 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Regístrate aquí
          </span>
        </p>

        <p className="text-sm text-center mt-2">
          <span
            className="text-green-400 hover:underline cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Recuperar contraseña
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
