import React from "react";
import Input from "../../../../components/ui/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useRegister";
import toast from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleRedirect = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const { mutate, isPending } = useLogin();
  // console.log(mutate, isPending, "Using mutation to check it working or not");

  const onSubmit = async (data) => {
    console.log(data, "data in login");
    mutate(data, {
      onSuccess: (data) => {
        console.log(data, "data in sucess");
      },
      onError: (error) => {
        console.log(error, "error in On error ");
        toast.error(error.message);
        console.log(error.response?.data);
      },
    }); // ✅ Call the mutation
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="shadow-xl p-8 rounded-2xl w-full max-w-md bg-white/90 backdrop-blur-sm border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-2">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Sign In
          </button>

          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <a
              href="#"
              onClick={handleRedirect}
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors cursor-pointer"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
