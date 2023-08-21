import Joi from "joi";

export const addToyJoy = Joi.object({
  apiAndroid: Joi.string().min(3).trim().required(),
  apiIos: Joi.string().min(3).trim().required(),
});
