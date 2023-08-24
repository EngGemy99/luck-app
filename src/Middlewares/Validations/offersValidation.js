import Joi from "joi";

export const addTopOrWallOffers = Joi.object({
  title: Joi.string().min(2).max(20).trim().required(),
  description: Joi.string().min(6).required(),
  url: Joi.string()
    .pattern(new RegExp("^(http|https)"), "i")
    .required()
    .messages({
      "string.empty": `URL cannot be an empty field`,
      "string.pattern.base": `URL must match the pattern http(s)`,
    }),
  offerType: Joi.string()
    .valid("topOffer", "offersWall")
    .default("topOffer")
    .required(),
  point: Joi.number().min(1).optional(),
});
