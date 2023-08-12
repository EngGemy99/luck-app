import Joi from "joi";

export const addTopOrWallOffers = Joi.object({
  title: Joi.string().min(2).max(20).trim().required(),
  description: Joi.string().min(6).required(),
  url: Joi.string().min(6).required(),
  offerType: Joi.string()
    .valid("topOffer", "offersWall")
    .default("topOffer")
    .required(),
});
