import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

// Protected Route Wrapper
import ProtectedRoute from "./components/ProtectedRoute";

// User Dashboard Components
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import DashboardIndex from "./pages/Dashboard/Index";
import DashboardSettings from "./pages/Dashboard/Settings";
import DashboardContent from "./pages/Dashboard/Content";

// Admin Panel Components
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminPanel from "./pages/Admin/Index";
import Instructordetais from "./pages/Admin/Instructordetais";
import InstructorEdit from "./pages/Admin/InstructorEdit";
import Createcourse from "./pages/Admin/Createcourse";
// import Course from "./pages/Admin/Course";
import Addlecture from "./pages/Admin/Addlecture";
import CourseList from "./pages/Admin/Course/CourseList";
import EditCourse from "./pages/Admin/EditCourse/EditCourse";
import Lecture from "./pages/Admin/Lecture/Lecture";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected User Routes - Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user", "instructor"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardIndex />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="content" element={<DashboardContent />} />
        </Route>

        {/* Protected Admin Routes - Admin Panel */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminPanel />} />
          <Route path="instructordetais" element={<Instructordetais />} />
          <Route path="instructor/edit/:id" element={<InstructorEdit />} />
          <Route path="createcourse" element={<Createcourse />} />
          <Route path="allcourse" element={<CourseList />} />
          <Route path="course/:id" element={<EditCourse />} />

          <Route path="course/:id/lecture/create" element={<Addlecture />} />
          {/* /courses/67fa89a9437bc27e58db8eca/lecture/create */}

          {/* edit lecture  */}
          {/* /courses/67fa89cf437bc27e58db8ece/lecture/67fa89cf437bc27e58db8ecf/edit */}
          <Route path="courses/:id/lecture/:id/edit" element={<Lecture />} />

        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
