import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const user = false;
  if (!user) {
    navigate("/login");
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
