import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex h-screen items-center justify-center relative ">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat " 
           style={{ backgroundImage: "url('/layout_auth_roomiesu.jpg')" }}>
      </div>

      {/* Contenedor del formulario */}
      <div className="relative bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <Outlet /> {/* Aquí se renderiza Login o Register */}
      </div>
    </div>


  );
};

export default AuthLayout;
