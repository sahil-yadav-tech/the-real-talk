import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-lg bg-white shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Authentication
        </h1>

        <Outlet />

      </div>

    </div>
  );
}