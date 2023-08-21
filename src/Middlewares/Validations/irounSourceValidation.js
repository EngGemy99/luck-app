import Joi from "joi";

export const addIrounSource = Joi.object({
  apiKey: Joi.string().min(3).trim().required(),
});
