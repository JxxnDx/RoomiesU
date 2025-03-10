import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import StudentLayout from "./layouts/StudentLayout";
import PublicLayout from "./layouts/PublicLayout";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import StudentHome from "./pages/StudentHome";

function App() {
  return (
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
  );
}

export default App;
