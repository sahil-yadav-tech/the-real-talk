import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import Register from "../features/auth/pages/Register/Register";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import VerifyOtp from "../features/auth/pages/Verify/VerifyOtp";
import Login from "../features/auth/pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";

export const publicRoutes = [
  {
    element: <MainLayout />,

    children: [


      {
        element: <AuthLayout />,

        children: [
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/verify-otp",
            element: <VerifyOtp />,
          },
                {
            path: "/login",
            element: <Login />,
          },
        ],
      },
    ],
  },
];

export const privateRoutes = [
  {
    element: <ProtectedRoute />,

    children: [
      {
        element: <MainLayout />,

        children: [
          {
            path: "/",
            element: <Home />,
          },
        ],
      },
    ],
  },
];

//   {
//     element: <ProtectedRoute />,

//     children: [
//       {
//         element: <DashboardLayout />,

//         children: [
//           {
//             path: "/dashboard",
//             element: <Dashboard />,
//           },

//           {
//             path: "/profile",
//             element: <Profile />,
//           },

//           {
//             path: "/orders",
//             element: <Orders />,
//           },

//           {
//             path: "/wishlist",
//             element: <Wishlist />,
//           },

//           {
//             path: "/settings",
//             element: <Settings />,
//           },
//         ],
//       },
//     ],
//   },
// ];

// export const adminRoutes = [
//   {
//     element: <AdminProtectedRoute />,

//     children: [
//       {
//         element: <AdminLayout />,

//         children: [
//           {
//             path: "/admin",
//             element: <AdminDashboard />,
//           },

//           {
//             path: "/admin/users",
//             element: <Users />,
//           },

//           {
//             path: "/admin/products",
//             element: <AdminProducts />,
//           },

//           {
//             path: "/admin/orders",
//             element: <AdminOrders />,
//           },
//         ],
//       },
//     ],
//   },
// ];

export const commonRoutes = [
  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
];
