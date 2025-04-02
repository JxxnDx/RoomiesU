import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useState } from "react";
import NavbarAdmin from "../components/NavbarAdmin";

const AdminLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="public-layout">
      <SideBar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      {/* El div principal ahora tiene margen izquierdo dinámico */}
      <div className={`transition-all duration-300 ${sidebarToggle ? "ml-64" : "ml-0"} `}>
        <NavbarAdmin sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
