import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";

import { registerSchema } from "../../schemas/auth.schema";
import { useRegister } from "../../hooks/useRegister";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
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
    console.log(data, "data white submit form");
    console.log(register("firstName"));
    delete data.confirmPassword;

    mutate(data, {
      onSuccess: (response) => {
        console.log(response, "hey sucess in ");
        toast.success(data.message);
         localStorage.setItem("verifyEmail", data.email);
        navigate("/verify-otp");
        // Next Sprint
        // toast.success(response.message)
        // navigate("/verify-otp")
      },

      onError: (error) => {
        console.log(error, "error in On error ");
        toast.error(error.message);
        console.log(error.response?.data);
      },
    });
  };

  console.log(errors, "errors");

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
