import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GiSharpAxe } from "react-icons/gi";

import CustomIcon from "../common/CustomIcon";
import ContainerForm from "./ContainerForm";
import BoxForm from "./BoxForm";
import Button from "./ButtonFrom";
import Link from "./Link";

import { signUpAPI } from "../../services/userAPI";

export function SignUp() {
  const [loading, SetLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchPassword = watch("password");

  const navigate = useNavigate();

  async function onSubmit(newUser) {
    SetLoading(true);
    const { email, password } = newUser;
    try {
      await signUpAPI({ email, password });
      SetLoading(false);
      navigate("/");
    } catch (error) {
      SetLoading(false);
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

        <BoxForm>
          <label>Password confirmation</label>
          <input
            style={errors?.passwordConfirmation && { outline: "1px solid rgb(255, 72, 72)" }}
            type="password"
            placeholder="Repeat your password"
            {...register("passwordConfirmation", {
              required: true,
              validate: (value) => value === watchPassword,
            })}
          />
          {errors?.passwordConfirmation?.type === "required" && (
            <p>Password confirmation is required.</p>
          )}

          {errors?.passwordConfirmation?.type === "validate" && (
            <p>Passwords does not match.</p>
          )}
        </ BoxForm>

        {loading ?
          <Button>
            <CustomIcon>
              <GiSharpAxe />
            </ CustomIcon>
          </Button>
          :
          <Button disabled={false} onClick={() => handleSubmit(onSubmit)()}>SIGN UP</Button>
        }

      </ContainerForm>
      <Link to="/">Sign in to an existing account</Link>
    </>
  );
}
