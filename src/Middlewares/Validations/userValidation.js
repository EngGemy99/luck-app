import Joi from "joi";

export const editUserPoint = Joi.object({
  id: Joi.string()
    .length(24)
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  pointsChange: Joi.number().required(),
});
export const editStatusUser = Joi.object({
  id: Joi.string()
    .length(24)
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  status: Joi.string().valid("active", "blocked").required(),
});
export const deleteUser = Joi.object({
  id: Joi.string()
    .length(24)
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
});
export const updateProfile = Joi.object({
  userName: Joi.string().min(2),
});
export const changePassword = Joi.object({
  password: Joi.string().min(2).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "confirmPassword does not match" }),
});
