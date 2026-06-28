import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import Register from "../features/auth/pages/Register";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

export const publicRoutes = [
  {
    element: <MainLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },

      // {
      //   path: "/about",
      //   element: <About />,
      // },

      // {
      //   path: "/contact",
      //   element: <Contact />,
      // },

      // {
      //   path: "/products",
      //   element: <Products />,
      // },
    ],
  },

  {
    element: <AuthLayout />,

    children: [
      // {
      //   path: "/login",
      //   element: <Login />,
      // },

      {
        path: "/register",
        element: <Register />,
      },

      // {
      //   path: "/forgot-password",
      //   element: <ForgotPassword />,
      // },
    ],
  },
];


export const privateRoutes = []
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