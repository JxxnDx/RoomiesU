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
import Aplicaciones from "./pages/Aplicaciones";
import AplicacionAdmin from "./pages/AplicacionAdmin";
import RentasAdmin from "./pages/RentasAdmin";
import VerPerfil from "./pages/VerPerfil";
import VerPerfilAdmin from "./pages/VerPerfilAdmin";
import RentasStudent from "./pages/RentasStudent";
import Inicio from "./pages/Inicio";
import InicioAdmin from "./pages/InicioAdmin";
import Reseñas from "./pages/Reseña";
import CrearReseñaStudent from "./pages/CrearReseñaStudent";
import CrearReseñaAdmin from "./pages/CrearReseñaAdmin";
import VerReseñasHabitacion from "./pages/VerReseñasHabitacion";
import VerReseñasEstudiante from "./pages/VerReseñasEstudiante";

// Lazy loading para las páginas principales
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
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
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/studenthome" element={<StudentHome />} />
            <Route path="/ver-habitacion/:id" element={<VerHabitacion />} />
            <Route path="/aplicacion/:id" element={<Aplicacion />} />
            <Route path="/ver-perfil" element={<VerPerfil />} />
            <Route path="/aplicaciones" element={<Aplicaciones />} />
            <Route path="/mis-rentas" element={<RentasStudent />} />
            <Route path="/reseñas" element={<Reseñas />} />
            <Route path="/crear-reseña" element={<CrearReseñaStudent />} />
            <Route path="/ver-reseñas-habitacion/:id" element={<VerReseñasHabitacion />} />
          </Route>
      </Route>

      {/* Rutas protegidas para administradores */}
      <Route element={<ProtectedRoutes allowedRoles={["administrador"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/InicioAdmin" element={<InicioAdmin />} />
          <Route path="/admindashboard" element={<Admindashboard />} />
          <Route path="/perfil-admin" element={<VerPerfilAdmin />} />
          <Route path="/unidadvivienda" element={<UnidadVivienda />} />
          <Route path="/creacionunidad" element={<CreationUnidad />} />
          <Route path="/editar-unidad/:id" element={<EditarUnidad />} />
          <Route path="/habitacion" element={<Habitaciones/>} />
          <Route path="/creacionhabitacion" element={<CreacionHabitacion/>} />
          <Route path="/editar-habitacion/:id" element={<EditarHabitacion/>} />
          <Route path="/agregar-servicio/:id" element={<Servicio/>} />
          <Route path="/aplicaciones-admin" element={<AplicacionAdmin/>} />
          <Route path="/rentas" element={<RentasAdmin/>} />
          <Route path="/ver-perfil-admin" element={<VerPerfilAdmin />} />
          <Route path="/crear-reseña-admin" element={<CrearReseñaAdmin />} />
          <Route path="/ver-reseñas-estudiante/:id" element={<VerReseñasEstudiante />} />
        </Route>
      </Route>

    </Routes>
    </Suspense>
  );
}

export default App;
