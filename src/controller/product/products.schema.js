const Joi = require('joi');

const productSchema = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.number().integer().min(1).required(),
});

module.exports = {
  productSchema,
};
