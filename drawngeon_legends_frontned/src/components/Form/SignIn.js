import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GiSharpAxe } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../services/firebase/firebase";

import { signInOauthAPI } from "../../services/oauthAPI";
import CustomIcon from "../common/CustomIcon";
import UserContext from "../../contexts/UserContext";
import ContainerForm from "./ContainerForm";
import BoxForm from "./BoxForm";
import Button from "./ButtonFrom";
import Link from "./Link";

import { signInAPI } from "../../services/userAPI";

export function SignIn() {
  const [loading, SetLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  async function onSubmit(newUser) {
    SetLoading(true);
    const { email, password } = newUser;
    try {
      const userData = await signInAPI({ email, password });
      setUserData(userData);
      SetLoading(false);
      navigate("/page/status");
    } catch (error) {
      console.log(error);
      SetLoading(false);
    }
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      // eslint-disable-next-line space-before-function-paren
      .then(async (result) => {
        const { email, accessToken } = result.user;
        if (!email) return;
        const { user, token } = await signInOauthAPI({ email, accessToken });
        if (!user) return;
        setUserData({ user, token });
        navigate("/page/status");
      }).catch((error) => {
        console.log(error);
      });
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

        {loading ?
          <Button>
            <CustomIcon>
              <GiSharpAxe />
            </ CustomIcon>
          </Button>
          :
          <Button onClick={() => handleSubmit(onSubmit)()}>SIGN IN</Button>
        }

        <Button onClick={signInWithGoogle} >
          <CustomIcon spin={false}>
            <FcGoogle />
          </ CustomIcon>
          Sign in with Google
        </Button>
      </ContainerForm>
      <Link to="/sign-up">New to here? Create an account.</Link>
    </>
  );
}

