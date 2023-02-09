import { singInPost, oauthSignIn } from "@/controllers";
import { validateBody } from "@/middlewares";
import { signInSchema, oauthSchema } from "@/schemas";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter
  .post("/sign-in", validateBody(signInSchema), singInPost)
  .post("/oauth", validateBody(oauthSchema), oauthSignIn);

export { authenticationRouter };
