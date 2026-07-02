import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";

import { otpSchema } from "../../schemas/auth.schema";
import { useverifyOtp, useResendOtp } from "../../hooks/useRegister";

const VerifyForm = () => {
  const navigate = useNavigate();

  // Add a ref to track if verification is in progress
  const isVerifying = useRef(false);

  const email = localStorage.getItem("verifyEmail") || "";

  const getRemainingSeconds = () => {
    const expiry = Number(localStorage.getItem("otpExpiry"));
    if (!expiry) return 0;
    const remaining = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
    return remaining;
  };

  const [seconds, setSeconds] = useState(getRemainingSeconds);

  const { mutate, isPending } = useverifyOtp();

  const { mutate: resendOtp, isPending: resendLoading } = useResendOtp();

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

  // Check if email exists - but skip if verification is in progress
  useEffect(() => {
    if (!email && !isVerifying.current) {
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
    // Set verifying flag to true
    isVerifying.current = true;

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

          // Reset verifying flag
          isVerifying.current = false;

          // Navigate to login
          navigate("/login", { replace: true });
        },
        onError: (error) => {
          toast.error(error.message);
          // Reset verifying flag on error so user can retry
          isVerifying.current = false;
        },
      },
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
      },
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
