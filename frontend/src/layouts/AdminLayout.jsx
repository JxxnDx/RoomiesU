import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar";
import { useState } from "react";
import NavbarAdmin from "../components/Navbar";
import { COLORS } from "../constants/styles";

const AdminLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="public-layout">
      <SideBar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      {/* El div principal ahora tiene margen izquierdo dinámico */}
      <div className={`transition-all duration-300 antialiased text-slate-500 dark:text-slate-400 ${COLORS["light_primary"]}  min-h-screen ${sidebarToggle ? "ml-64" : "ml-0"} `}>
        <NavbarAdmin sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
