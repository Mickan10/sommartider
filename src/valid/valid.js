import Joi from "joi";

export const productSchema = Joi.object({
  namn: Joi.string()
    .min(3)
    .pattern(/^[a-zA-ZåäöÅÄÖ\s]+$/)
    .required()
    .messages({
      "string.empty": "Produktnamn får inte vara tomt.",
      "string.min": "Namn måste vara minst 3 bokstäver.",
      "string.pattern.base": "Namn får bara innehålla bokstäver och mellanslag.",
      "any.required": "Produktnamn är obligatoriskt."
    }),

    pris: Joi.string()
      .pattern(/^\d+$/)
      .custom((value, helpers) => {
        const number = parseInt(value, 10);
        if (number < 1) {
          return helpers.message("Pris måste vara minst 1 kr.");
        }
        return value;
      })
      .required()
      .messages({
        "string.empty": "Pris får inte vara tomt.",
        "string.pattern.base": "Pris måste vara ett heltal (utan 'kr').",
        "any.required": "Pris är obligatoriskt."
      }),


  bild: Joi.string()
    .uri()
    .pattern(/^https:\/\//)
    .required()
    .messages({
      "string.empty": "Bild-URL får inte vara tom.",
      "string.uri": "Bild-URL måste vara en giltig länk.",
      "string.pattern.base": "Bild-URL måste börja med 'https://'.",
      "any.required": "Bild-URL är obligatorisk."
    })
});
