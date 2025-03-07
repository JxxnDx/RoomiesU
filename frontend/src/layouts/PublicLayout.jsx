import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="public-layout">
      <div className="public-container">
        <Outlet /> {/* Aquí renderizamos el login o el register*/}
      </div>
    </div>
  );
};

export default PublicLayout;
