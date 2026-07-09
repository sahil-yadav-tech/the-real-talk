import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";

import { otpSchema } from "../../schemas/auth.schema";
import {
  useverifyOtp,
  useResendOtp,
} from "../../hooks/useRegister";

const VerifyForm = () => {
  const navigate = useNavigate();

  // Read once on mount — do NOT recompute from localStorage on every render.
  // Recomputing caused a race: onSuccess clears "verifyEmail" from localStorage,
  // then a re-render (triggered by isPending flipping to false) recomputed
  // email as "", which fired the guard effect below and redirected to
  // /register right after navigate("/login") had already been called.
  const [email] = useState(() => localStorage.getItem("verifyEmail") || "");

  const getRemainingSeconds = () => {
    const expiry = Number(localStorage.getItem("otpExpiry"));
    if (!expiry) return 0;
    const remaining = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
    return remaining;
  };

  const [seconds, setSeconds] = useState(getRemainingSeconds);

  const { mutate, isPending } = useverifyOtp();

  const {
    mutate: resendOtp,
    isPending: resendLoading,
  } = useResendOtp();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  // Check if email exists (only runs meaningfully on mount now,
  // since `email` is stable state, not re-read from localStorage each render)
  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  // Timer logic
  useEffect(() => {
    // If no expiry exists, set one
    if (!localStorage.getItem("otpExpiry")) {
      const expiry = Date.now() + 90 * 1000;
      localStorage.setItem("otpExpiry", expiry.toString());
      setSeconds(90);
    }

    const interval = setInterval(() => {
      const remaining = getRemainingSeconds();
      setSeconds(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        localStorage.removeItem("otpExpiry");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data) => {
    mutate(
      {
        email,
        otp: data.otp,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);

          // Clear localStorage
          localStorage.removeItem("verifyEmail");
          localStorage.removeItem("otpExpiry");

          // Navigate to login
          navigate("/login");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const handleResend = () => {
    resendOtp(
      {
        email,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          const expiry = Date.now() + 90 * 1000;
          localStorage.setItem("otpExpiry", expiry.toString());
          setSeconds(90);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="shadow-xl p-8 rounded-2xl w-full max-w-md bg-white/90 backdrop-blur-sm border border-white/20">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Verify OTP</h2>
          <p className="text-gray-500 text-sm mt-2">
            We've sent a verification code to
          </p>
          <p className="text-indigo-600 font-semibold text-sm mt-1">{email}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email"
            value={email}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
          />

          <div>
            <Input
              label="OTP"
              placeholder="Enter 6-digit OTP"
              type="text"
              inputMode="numeric"
              maxLength={6}
              autoComplete="one-time-code"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400 text-center text-2xl tracking-widest"
              error={errors.otp?.message}
              {...register("otp", {
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
                },
              })}
            />
            <div className="flex justify-between mt-2">
              {seconds > 0 ? (
                <p className="text-sm text-gray-500">
                  Resend OTP in{" "}
                  <strong className="text-indigo-600">
                    {minutes}:{remainingSeconds.toString().padStart(2, "0")}
                  </strong>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resendLoading ? "Sending..." : "Resend OTP"}
                </button>
              )}
            </div>
          </div>

          <Button
            type="submit"
            loading={isPending}
            disabled={!isValid}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? "Verifying..." : "Verify OTP"}
          </Button>

          <p className="text-center text-gray-600 text-sm">
            Wrong email?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors cursor-pointer"
            >
              Register again
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyForm;