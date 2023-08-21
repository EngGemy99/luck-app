import Joi from "joi";

export const addWannds = Joi.object({
  apiKey: Joi.string().min(3).trim().required(),
  apiScrit: Joi.string().min(3).trim().required(),
});
