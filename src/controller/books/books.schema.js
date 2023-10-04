const Joi = require('joi');

const AddBook = Joi.object().keys({
  author: Joi.string().min(3).required(),
  title: Joi.string().min(2).required(),
  year: Joi.number().integer().max(new Date().getFullYear()).required(),
  type: Joi.array()
    .min(1)
    .items(Joi.string().valid('Adventure', 'Horror', 'Comic', 'Nonfiction')),
  readingStatus: Joi.boolean(),
});

const UpdateBook = Joi.object().keys({
  author: Joi.string().min(3),
  title: Joi.string().min(2),
  year: Joi.number().integer().max(new Date().getFullYear()),
  type: Joi.array()
    .min(1)
    .items(Joi.string().valid('Adventure', 'Horror', 'Comic', 'Nonfiction')),
  readingStatus: Joi.boolean(),
});

module.exports = {
  AddBook,
  UpdateBook,
};
