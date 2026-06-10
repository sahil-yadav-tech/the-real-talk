import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

// import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}

      <Route
        path="/register"
        element={<Register />}
      />
       <Route
        path="/login"
        element={<Login />}
      />
{/* 
      <Route
        path="/chat"
        element={<Chat />}
      /> */}
    </Routes>
  );
};

export default AppRoutes;