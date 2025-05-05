import Joi from "joi";

export const productSchema = Joi.object({
  namn: Joi.string().required(),
  pris: Joi.string().pattern(/^\d+ kr$/).required(),
});