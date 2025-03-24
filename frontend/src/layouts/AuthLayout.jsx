import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const AuthLayout = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/layout_auth_roomiesu.webp";
    img.onload = () => setImageLoaded(true); // Se actualiza el estado cuando la imagen se carga
  }, []);

  if (!imageLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <p className="text-white text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center relative">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/layout_auth_roomiesu.webp')" }}
      ></div>

      {/* Contenedor del formulario (se renderiza solo si la imagen ya cargó) */}
      <div className="relative bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
