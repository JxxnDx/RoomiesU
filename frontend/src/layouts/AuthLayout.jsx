import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const AuthLayout = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/layout_auth_roomiesu.webp";
    img.onload = () => setImageLoaded(true);
  }, []);

  if (!imageLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <p className="text-white text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 overflow-auto relative">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 bg-[url('/layout_auth_roomiesu.webp')] bg-cover bg-center bg-no-repeat"></div>
      

      {/* Contenedor del formulario */}
      <div className="relative bg-gray-900 p-10 rounded-xl shadow-xl w-full max-w-lg mt-16 mb-16">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
