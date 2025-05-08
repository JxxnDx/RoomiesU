import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useState } from "react";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="public-layout">
      <SideBar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      {/* El div principal ahora tiene margen izquierdo dinámico */}
      <div className={`transition-all duration-300 antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen ${sidebarToggle ? "ml-64" : "ml-0"} `}>
        <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
