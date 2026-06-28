import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <nav>Navbar</nav>

      <main>
        <Outlet />
      </main>

      <footer>footer</footer>
    </>
  );
}
