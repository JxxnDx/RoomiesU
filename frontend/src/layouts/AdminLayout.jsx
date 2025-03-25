import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";

const AdminLayout = () => {
  return (
    <div className="public-layout">
      <div className="public-container">
        <NavbarAdmin/>
        <Outlet /> {/* Aquí renderizamos el login o el register*/}
      </div>
    </div>
  );
};

export default AdminLayout;
