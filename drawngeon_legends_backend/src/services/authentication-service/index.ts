import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import { exclude } from "@/utils/prisma-utils";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApplicationError } from "@/protocols";
import { requestError } from "@/errors";

export function invalidCredentialsError(): ApplicationError {
  return {
    name: "InvalidCredentialsError",
    message: "email or password are incorrect",
  };
}

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email);
  if (!user?.id) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

async function oauthUser({ email, accessToken }: oauthSignIn) {
  const user = await userRepository.findByEmail(email);
  if(user?.id) {
    const token = await createSession(user.id);
    return {
      user: exclude(user, "password"),
      token,
    };
  }
  const newPass = accessToken.slice(4, 18);
  const password = jwt.sign(newPass, process.env.JWT_SECRET);
  const newUser = await userRepository.create({ email, password });
  if(!newUser) {
    throw requestError(500, "Não foi possível fazer login.");
  }
  const newUserToken = await createSession(newUser.id);
  return {
    user: exclude(newUser, "password"),
    token: newUserToken,
  };
}

export type SignInParams = Pick<User, "email" | "password">;

type oauthSignIn = {
  email: string;
  accessToken: string;
}

type SignInResult = {
  user: Pick<User, "id" | "email">;
  token: string;
};

type GetUserOrFailResult = Pick<User, "id" | "email" | "password">;

const authenticationService = {
  signIn,
  oauthUser,
};

export default authenticationService;
