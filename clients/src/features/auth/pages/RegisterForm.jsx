import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../components/Button";
import Input from "../../../components/Input";

import { registerSchema } from "../schemas/auth.schema";
import { useRegister } from "../hooks/useRegister";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),

    mode: "onTouched",

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useRegister();
  const onSubmit = (data) => {
    delete data.confirmPassword;

    mutate(data, {
      onSuccess: (response) => {
        console.log(response);

        // Next Sprint
        // toast.success(response.message)
        // navigate("/verify-otp")
      },

      onError: (error) => {
        console.log(error.response?.data);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="First Name"
        {...register("firstName")}
        error={errors.firstName?.message}
      />

      <Input
        label="Last Name"
        {...register("lastName")}
        error={errors.lastName?.message}
      />

      <Input
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Phone Number"
        {...register("phoneNumber")}
        error={errors.phoneNumber?.message}
      />

      <Input
        label="Password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />

      <Input
        label="Confirm Password"
        type="password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <Button type="submit" loading={isPending}>
        Register
      </Button>
    </form>
  );
}
