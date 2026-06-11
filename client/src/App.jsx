import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Navbar } from "./components/common/Navbar/Navbar";
import Erro404 from "./components/common/Erro404";
import Footer from "./components/common/Footer/Footer";



const AppRoutes = () => {
  return (
    <>
           <Navbar />
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />

      <Route path="*" element={<Erro404 />} />


    </Routes>
    <Footer />
    </>
  );
};

export default AppRoutes;
