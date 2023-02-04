import Joi from "joi";
import { Gender, Races, Classes, Skills } from "@prisma/client";

export const newAvatarSchema = Joi.object({
  nick: Joi.string().min(3).required(),
  stamina: Joi.number().integer().min(1).max(100).required(),
  mana: Joi.number().integer().min(1).max(100).required(),
  level: Joi.number().integer().min(1).max(20).required(),
  xp: Joi.number().integer().min(0).max(10).required(),
  gold: Joi.number().integer().min(0).required(),
  identity: Joi.string().required().valid(...Object.values(Gender)),
  breed: Joi.string().required().valid(...Object.values(Races)),
  class: Joi.string().required().valid(...Object.values(Classes)),
  skill: Joi.string().required().valid(...Object.values(Skills)),
});

export const updateAvatarSchema = newAvatarSchema.keys({
  id: Joi.number().integer().required(),
});
