import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideBarStudent from "../components/SidebarStudent";
import Navbar from "../components/Navbar";

const StudentLayout = () => {
   const [sidebarToggle, setSidebarToggle] = useState(true);
  return (
    <div className="student-layout">
          <SideBarStudent sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
          {/* El div principal ahora tiene margen izquierdo dinámico */}
          <div className={`transition-all duration-300 ${sidebarToggle ? "ml-64" : "ml-0"} `}>
            <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            <Outlet />
          </div>
        </div>
  );
};

export default StudentLayout;
