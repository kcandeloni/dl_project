import Joi from "joi";

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const oauthSchema = Joi.object({
  accessToken: Joi.string().min(20).required(),
  email: Joi.string().email().required(),
});
