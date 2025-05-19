import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoutes from "./components/ProtectedRoutes";


import AuthLayout from "./layouts/AuthLayout";
import StudentLayout from "./layouts/StudentLayout";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import Admindashboard from "./pages/Admindashboard";
import UnidadVivienda from "./pages/UnidadVivienda";
import CreationUnidad from "./pages/CreationUnidad";
import EditarUnidad from "./pages/EditarUnidad";
import Habitaciones from "./pages/Habitacion";
import CreacionHabitacion from "./pages/CreationHabitacion";
import EditarHabitacion from "./pages/EditarHabitacion";
import Servicio from "./pages/Servicio";
import VerHabitacion from "./pages/VerHabitacion";
import Aplicacion from "./pages/Aplicacion";

// Lazy loading para las páginas principales
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/register"));
const StudentHome = lazy(() => import("./pages/StudentHome"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
 const ResetPassword = lazy(() => import("./pages/ResetPassword"));

 const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-solid"></div>
  </div>
);


function App() {
  return (
    <Suspense fallback={<Loading />}>
    <Routes>
      {/*  Páginas públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Páginas de autenticación */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

      {/* Rutas protegidas para estudiantes */}
      <Route element={<ProtectedRoutes allowedRoles={["estudiante"]} />}>
          <Route element={<StudentLayout />}>
            <Route path="/studenthome" element={<StudentHome />} />
            <Route path="/ver-habitacion/:id" element={<VerHabitacion />} />
            <Route path="/aplicacion/:id" element={<Aplicacion />} />
          </Route>
      </Route>

      {/* Rutas protegidas para administradores */}
      <Route element={<ProtectedRoutes allowedRoles={["administrador"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admindashboard" element={<Admindashboard />} />
          <Route path="/unidadvivienda" element={<UnidadVivienda />} />
          <Route path="/creacionunidad" element={<CreationUnidad />} />
          <Route path="/editar-unidad/:id" element={<EditarUnidad />} />
          <Route path="/habitacion" element={<Habitaciones/>} />
          <Route path="/creacionhabitacion" element={<CreacionHabitacion/>} />
          <Route path="/editar-habitacion/:id" element={<EditarHabitacion/>} />
          <Route path="/agregar-servicio/:id" element={<Servicio/>} />
        </Route>
      </Route>

    </Routes>
    </Suspense>
  );
}

export default App;
