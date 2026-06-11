// AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Navbar } from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";
import Erro404 from "./components/common/Erro404";
import Chat from "./pages/Chat";

const AppRoutes = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />

          <Route path="*" element={<Erro404 />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AppRoutes;