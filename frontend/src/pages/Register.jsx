import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COLORS, TEXT } from '../constants/styles';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    identificacion: "",
    correo: "",
    telefono: "",
    edad: "",
    password: "",
    descripcion: "",
    role: "student", // Valor por defecto
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validaciones manuales sin librerías externas
  const validateForm = () => {
    if (!formData.nombre || !formData.apellido || !formData.correo || !formData.password) {
      return "Todos los campos son obligatorios";
    }
    if (formData.password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }
    if (!formData.correo.includes("@")) {
      return "El correo debe ser válido";
    }
    if(formData.telefono.length < 9) {
      return "El número de telefono debe ser válido";
    }
    if(formData.identificacion.length != 10){
      return "La identificación debe tener 10 caracteres";
    }
    return null; // Si no hay errores
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const endpoint = formData.role === "admin" ? "/auth/register/admin" : "/auth/register/student";

    try {
      const response = await axios.post(`http://localhost:4000${endpoint}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage(response.data.message);

      
      // localStorage.setItem("token", response.data.token);
      // localStorage.setItem("role", formData.role);

      //Antes de rediriguirse al login espera para ver la respuesta del backend
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Error en la petición:", err.response?.data || err);
      
    }
  };

  return (
    <div className={`${COLORS["light_primary"]} backdrop-blur-md text-gray-800 p-6 rounded-lg w-full max-w-md`}>
      <h2 className="text-2xl font-bold text-center">Regístrate</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-800 text-sm">Selecciona tu rol</label>
          <select
            name="role"
            className={`w-full p-2 mt-1 rounded ${COLORS["light_primary"]} border border-gray-600 focus:outline-none focus:border-[#01b09e]`}
            value={formData.role}
            onChange={handleChange}
          >
            <option value="student">Estudiante</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        {["nombre", "apellido", "identificacion", "correo", "telefono", "edad", "password", "descripcion"].map((field) => (
  <div className="mb-4 relative" key={field}>
    <label className="block text-gray-800 text-sm capitalize">{field}</label>
    {field === "descripcion" ? (
      <textarea
        name={field}
        className={`w-full p-2 mt-1 rounded ${COLORS["light_primary"]} border border-gray-600 focus:outline-none focus:border-[#01b09e] resize-none h-32`}
        value={formData[field]}
        onChange={handleChange}
      />
    ) : (
      <div className="relative">
        <input
          type={field === "password" && showPassword ? "text" : field === "password" ? "password" : field === "correo" ? "email" : "text"}
          name={field}
          className={`w-full p-2 mt-1 rounded ${COLORS["light_primary"]} border border-gray-600 focus:outline-none focus:border-[#01b09e] pr-10`}
          value={formData[field]}
          onChange={handleChange}
        />
        {field === "password" && (
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ?  "🔒" : "👁️"}
          </button>
        )}
      </div>
    )}
  </div>
))}


        <button type="submit" className={`w-full ${COLORS["light_secundary"]} hover:bg-[#018ab0] text-white font-bold py-2 px-4 rounded transition`}>
          Registrarse
        </button>

        <p className="text-sm text-center mt-4">
          ¿Ya tienes una cuenta?{" "}
          <span className="text-[#01b09e] hover:underline cursor-pointer" onClick={() => navigate("/login")}>
            Ingresa aquí
          </span>
        </p>
      </form>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {message && <p className="text-green-400 mt-2 text-center">{message}</p>}
    </div>
  );
}