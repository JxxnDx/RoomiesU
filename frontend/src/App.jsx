import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoutes from "./components/ProtectedRoutes";


import AuthLayout from "./layouts/AuthLayout";
import StudentLayout from "./layouts/StudentLayout";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import Admindashboard from "./pages/admindashboard";

// Lazy loading para las páginas principales
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/login"));
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
      <Route element={<ProtectedRoutes allowedRoles={["student"]} />}>
          <Route element={<StudentLayout />}>
            <Route path="/studenthome" element={<StudentHome />} />
          </Route>
      </Route>

      {/* Rutas protegidas para administradores */}
      <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admindashboard" element={<Admindashboard />} />
        </Route>
      </Route>

    </Routes>
    </Suspense>
  );
}

export default App;
