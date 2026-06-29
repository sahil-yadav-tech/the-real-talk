import { Routes, Route } from "react-router-dom";

import { publicRoutes, privateRoutes, commonRoutes } from "../routes/routes";

//TODO:- EG This function make like this
{
  /* <Route element={<MainLayout />}>
  <Route path="/" element={<Home />} />
</Route>; */
}
// Recursive function
function renderRoutes(routes) {
  return routes.map((route, index) => (
    <Route key={route.path || index} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
}

export default function AppRouter() {
  return (
    <Routes>
      {renderRoutes(publicRoutes)}
      {renderRoutes(privateRoutes)}
      {renderRoutes(commonRoutes)}
    </Routes>
  );
}

// <Routes>
//   <Route element={<MainLayout />}>
//     <Route path="/" element={<Home />} />
//   </Route>

//   <Route element={<AuthLayout />}>
//     <Route path="/register" element={<Register />} />
//   </Route>
// </Routes>;

// TODO : UNDER STAND THE FLOW
// Browser URL

// /register
//       │
//       ▼
// React Router
//       │
//       ▼
// MainLayout
//       │
//       ▼
// Navbar

//       │
//       ▼
// Outlet
//       │
//       ▼
// AuthLayout
//       │
//       ▼
// Logo

//       │
//       ▼
// Outlet
//       │
//       ▼
// Register

//       │
//       ▼
// Footer

// step
// renderRoutes(publicRoutes)

// routes come
// const routes = [
//   {
//     element: <MainLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         element: <AuthLayout />,
//         children: [
//           {
//             path: "/register",
//             element: <Register />,
//           },
//         ],
//       },
//     ],
//   },
// ];

// step 3
// [
//    Object1
// ]

// Now
// route =
// {
//     element:<MainLayout/>,

//     children:[
//        ...
//     ]
// }

{
  /* <Route
    key={0}
    path={undefined}
    element={<MainLayout/>}
>

</Route> */
}
// Tum notice karoge

// path

// kyun undefined hai?

// Kyuki object me path hi nahi hai.

// {
//     element:<MainLayout/>
// }

// React Router allow karta hai.

// Isko Layout Route bolte hain.

// ------------------------------------------------------

// Ab ye line
// {route.children && renderRoutes(route.children)}

// Dekhti hai

// children hai?

// Haan.

// To dobara

// renderRoutes(children)

// call hoga.

// ------------------------------------------------------

{
  /* <Routes>
  <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />

    <Route element={<AuthLayout />}>
      <Route path="/register" element={<Register />} />
    </Route>
  </Route>
</Routes>; */
}
