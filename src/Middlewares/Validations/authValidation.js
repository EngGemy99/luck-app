import Joi from "joi";

export const register = Joi.object({
  userName: Joi.string().min(2).max(20).trim().required(),
  email: Joi.string().email().required(),
  confirmEmail: Joi.any()
    .equal(Joi.ref("email"))
    .required()
    .messages({ "any.only": "email does not match" }),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin").required(),

  // isActive: Joi.boolean().default(true),
  // verified: Joi.boolean().default(false),
});
export const login = Joi.object({
  userName: Joi.string().min(2).max(20).trim().required(),
  password: Joi.string().min(6).required(),
});
