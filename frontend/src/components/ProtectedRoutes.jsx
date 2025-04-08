import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoutes = ({ allowedRoles }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  //Lo que se hace acá es hacer la petición a auth/me que verifica que el Login y el token
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:4000/auth/me", {
          withCredentials: true,
        });
        
        // console.log("Respuesta completa de /auth/me:", response.data);
        
        // Muestra todos los detalles del usuario
        setUserData(response.data.user);
        
        // Intenta obtener el rol de manera más flexible
        //Esto es clave porque la parecer estaba fallando antes esto
        const role = response.data.user.role;
        
        setUserRole(role);
        // console.log("Rol extraído:", role);
      } catch (error) {
        console.error("Error al obtener el rol:", error);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) return <div>Cargando...</div>;

  // Depuración adicional
  // console.log("Roles permitidos:", allowedRoles);
  // console.log("Rol de usuario actual:", userRole);

  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;