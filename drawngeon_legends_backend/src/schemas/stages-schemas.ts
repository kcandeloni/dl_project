import Joi from "joi";

export const newStageSchema = Joi.object({
  name: Joi.string().min(3).required(),
  options: Joi.string().required(),
  description: Joi.string().required(),
  objects: Joi.string().required(),
  refStageId: Joi.number().min(0).integer().strict().required(),
});

export const updateStageSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().min(3).required(),
  options: Joi.string().required(),
  description: Joi.string().required(),
  objects: Joi.string().required(),
});

