import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";


import AuthLayout from "./layouts/AuthLayout";
import StudentLayout from "./layouts/StudentLayout";
import PublicLayout from "./layouts/PublicLayout";

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

      {/* Páginas privadas después de iniciar sesión */}
      <Route element={<StudentLayout />}>
      <Route path="/studenthome" element={<StudentHome />} />
      </Route>
    </Routes>
    </Suspense>
  );
}

export default App;
