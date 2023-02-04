import Joi from "joi";

export const newGameSchema = Joi.object({
  name: Joi.string().min(3).required(),
  level: Joi.number().min(1).max(99).required(),
  description: Joi.string().required(),
});

export const updateGameSchema = newGameSchema.keys({
  id: Joi.number().integer().required(),
});

export const gameStageParams = Joi.object({
  gameId: Joi.number().min(1).integer().strict().required(),
  stageId: Joi.number().min(1).integer().strict().required(),
  position: Joi.number().min(1).integer().strict().required(),
});

export const arrayGameStages = Joi.object({
  gameStages: Joi.array().items(gameStageParams)
});
