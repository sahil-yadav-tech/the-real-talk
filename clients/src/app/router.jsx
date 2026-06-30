import { Routes, Route } from "react-router-dom";

import { publicRoutes, privateRoutes, commonRoutes } from "../routes/routes";

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
