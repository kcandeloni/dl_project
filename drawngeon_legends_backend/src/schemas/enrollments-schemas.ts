import Joi from "joi";

export const enrollmentSchema = Joi.object({
  name: Joi.string().min(3).required(),
  birthday: Joi.string().isoDate().required(),
});
