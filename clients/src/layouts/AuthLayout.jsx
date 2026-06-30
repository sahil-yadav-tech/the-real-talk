import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const navigate = useNavigate();
  // const logIn = false; // This should come from your auth context/state

  // useEffect(() => {
  //   if (logIn) {
  //     navigate("/", { replace: true });
  //   }
  // }, [logIn, navigate]); 

  // if (logIn) {
  //   return null; 
  // }
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full ">
        <h1 className="">Authentication</h1>

        <Outlet />
      </div>
    </div>
  );
}
