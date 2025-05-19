import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { COLORS, TEXT } from '../constants/styles';

const AuthLayout = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // useEffect(() => {
  //   const img = new Image();
  //   img.src = "/layout_auth_roomiesu.webp";
  //   img.onload = () => setImageLoaded(true);
  // }, []);

  // if (!imageLoaded) {
  //   return (
  //     <div className="flex h-screen items-center justify-center bg-gray-900">
  //       <p className="text-white text-lg">Cargando...</p>
  //     </div>
  //   );
  // }

  return (
    <div className={`flex min-h-screen items-center justify-center ${COLORS["light_primary"]} overflow-auto relative`}>
      {/* Imagen de fondo */}
      <div className="absolute inset-0 bg-gradient-to-t from-white to-blue-100 dark:from-gray-200 dark:to-blue-100"></div>
      

      {/* Contenedor del formulario */}
      <div className={`relative ${COLORS["light_primary"]} p-10 m-8 rounded-xl shadow-xl`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
