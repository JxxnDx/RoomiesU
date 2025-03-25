import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="public-layout">
      <div className="public-container">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
