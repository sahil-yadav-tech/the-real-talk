import React from "react";
import Input from "../../../../components/ui/Input";
import { useForm } from "react-hook-form";

const LoginForm = () => {
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

  const onSubmit = async (data) => {
    console.log(data, "data in login");
  };
  return (
    <div className="shadow-md p-4 rounded-2xl w-[40%] ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="email"
          type="email"
          placeholder="enter your email"
          className=""
          {...register("email")}
        />
        <Input
          label="pasword"
          type="password"
          placeholder="enter your password"
          {...register("password")}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
