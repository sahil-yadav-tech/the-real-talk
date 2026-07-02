import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../../../components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "../../schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { useverifyOtp } from "../../hooks/useRegister";

const VerifyForm = () => {
  const { mutate, isPending } = useverifyOtp();
  const email = localStorage.getItem("verifyEmail") || "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
    mode: "onTouched",
    defaultValues: {
      otp: "",
      email,
    },
  });

  const onsubmit = (data) => {
    console.log(data, "data");
    mutate(data, {
      onSuccess: (response) => {
        console.log(response, "response");
      },
    });
  };

  console.log(errors, "errors");

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Input label="Email" value={email} disabled />

        <Input
          type="text"
          inputMode="numeric"
          placeholder="Enter your OTP"
          maxLength={6}
          label="OTP"
          {...register("otp", {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
            },
          })}
        />

        <button type="submit" disabled={errors.otp}>
          Submit{" "}
        </button>
      </form>
    </div>
  );
};

export default VerifyForm;
