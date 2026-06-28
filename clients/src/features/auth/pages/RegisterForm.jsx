import { useForm } from "react-hook-form";

import Input from "../../../components/Input";
import Button from "../../../components/Button";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <Input
        label="First Name"
        placeholder="Enter first name"
        {...register("firstName")}
      />

      <Input
        label="Last Name"
        placeholder="Enter last name"
        {...register("lastName")}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter email"
        {...register("email")}
      />

      <Button type="submit">
        Register
      </Button>

    </form>
  );
}