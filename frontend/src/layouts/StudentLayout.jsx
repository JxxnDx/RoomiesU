import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <div className="student-layout">
      <div className="student-container">
        <Outlet /> {/* Aquí se renderiza el Login o Register */}
      </div>
    </div>
  );
};

export default StudentLayout;
