import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    console.log("Token en localStorage:", token);
    console.log("Role en localStorage:", role);
    console.log("Roles permitidos:", allowedRoles);

    if (!token) {
      setIsAuthenticated(false);
    } else if (allowedRoles && !allowedRoles.includes(role)) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [location.pathname]);

  if (isAuthenticated === null) return null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
