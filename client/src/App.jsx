import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

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
             <Route
        path="/home"
        element={<Home />}
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