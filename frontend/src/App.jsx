import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import AuthLayout from "./layouts/AuthLayout";
import StudentLayout from "./layouts/StudentLayout";
import PublicLayout from "./layouts/PublicLayout";

// Lazy loading para las páginas principales
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/register"));
const StudentHome = lazy(() => import("./pages/StudentHome"));

// Componente de carga mientras se renderizan las rutas
const Loading = () => <div>Cargando...</div>;
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
      </Route>

      {/* Páginas privadas después de iniciar sesión */}
      <Route element={<StudentLayout />}>
      <Route path="/studenthome" element={<StudentHome />} />
      </Route>
    </Routes>
    </Suspense>
  );
}

export default App;
