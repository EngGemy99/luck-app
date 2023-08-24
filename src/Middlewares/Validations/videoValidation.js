import Joi from "joi";

export const addVideo = Joi.object({
  title: Joi.string().min(2).max(20).trim().required(),
  description: Joi.string().min(6).required(),
  url: Joi.string()
    .uri({
      scheme: [/https?/],
    })
    .required()
    .messages({
      "string.empty": `URL cannot be an empty field`,
      "string.uri": `URL must be a valid URI and should start with http or https`,
    }),
});
