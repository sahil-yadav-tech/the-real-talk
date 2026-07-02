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

  const email = localStorage.getItem("verifyEmail") || "";

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

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  useEffect(() => {
    // If no expiry exists, set one
    if (!localStorage.getItem("otpExpiry")) {
      const expiry = Date.now() + 90 * 1000;
      localStorage.setItem("otpExpiry", expiry.toString());
      setSeconds(90);
    }

    // Update seconds every second
    const interval = setInterval(() => {
      const remaining = getRemainingSeconds();
      setSeconds(remaining);

      // Stop interval when timer reaches 0
      if (remaining <= 0) {
        clearInterval(interval);
        // Remove expiry from localStorage when timer ends
        localStorage.removeItem("otpExpiry");
      }
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array - runs once on mount

  const onSubmit = (data) => {
    mutate(
      {
        email,
        otp: data.otp,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          localStorage.removeItem("verifyEmail");
          localStorage.removeItem("otpExpiry");
          navigate("/");
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input label="Email" value={email} disabled />

      <Input
        label="OTP"
        placeholder="Enter OTP"
        type="text"
        inputMode="numeric"
        maxLength={6}
        autoComplete="one-time-code"
        error={errors.otp?.message}
        {...register("otp", {
          onChange: (e) => {
            e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
          },
        })}
      />

      {seconds > 0 ? (
        <p className="text-sm text-gray-500">
          Resend OTP in{" "}
          <strong>
            {minutes}:{remainingSeconds.toString().padStart(2, "0")}
          </strong>
        </p>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          disabled={resendLoading}
          className="text-blue-600 hover:underline"
        >
          {resendLoading ? "Sending..." : "Resend OTP"}
        </button>
      )}

      <Button type="submit" loading={isPending} disabled={!isValid}>
        Verify OTP
      </Button>
    </form>
  );
};

export default VerifyForm;