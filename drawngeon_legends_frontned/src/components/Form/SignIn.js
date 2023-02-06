import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import UserContext from "../../contexts/UserContext";
import ContainerForm from "./ContainerForm";
import BoxForm from "./BoxForm";
import Button from "./ButtonFrom";
import Link from "./Link";

import { signInAPI } from "../../services/userAPI";

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  async function onSubmit(newUser) {
    const { email, password } = newUser;
    try {
      const userData = await signInAPI({ email, password });
      setUserData(userData);
      navigate("/page/status");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ContainerForm>
        <BoxForm>
          <label>E-mail</label>
          <input
            style={errors?.email && { outline: "1px solid rgb(255, 72, 72)" }}
            type="email"
            placeholder="Your e-mail"
            {...register("email", { required: true })}
          />
          {errors?.email?.type === "required" && (
            <p>Email is required.</p>
          )}

          {errors?.email?.type === "validate" && (
            <p>Email is invalid.</p>
          )}
        </ BoxForm>

        <BoxForm>
          <label>Password</label>
          <input
            style={errors?.password && { outline: "1px solid rgb(255, 72, 72)" }}
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
          />

          {errors?.password?.type === "required" && (
            <p>Password is required.</p>
          )}

          {errors?.password?.type === "minLength" && (
            <p>
              Password needs to have at least 6 characters.
            </p>
          )}
        </ BoxForm>

        <Button onClick={() => handleSubmit(onSubmit)()}>Sign In</Button>
      </ContainerForm>
      <Link to="/sign-up">Sign Up</Link>
    </>
  );
}
