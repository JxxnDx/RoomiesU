import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const AuthLayout = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/layout_auth_roomiesu.jpg";
    img.onload = () => setImageLoaded(true); // Cambia el estado cuando se carga la imagen
  }, []);

  return (
    <div className="flex h-screen items-center justify-center relative">
      {/* Imagen de fondo con visibilidad controlada */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: "url('/layout_auth_roomiesu.jpg')" }}
      ></div>

      {/* Contenedor del formulario */}
      <div className="relative bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <Outlet /> {/* Aquí se renderiza Login o Register */}
      </div>
    </div>
  );
};

export default AuthLayout;
