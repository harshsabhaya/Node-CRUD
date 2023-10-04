const express = require('express');
const route = express.Router();
const {
  addBookController,
  updateBookController,
  getBooksController,
  deleteBookController,
} = require('./books.controller');
const { AddBook, UpdateBook } = require('./books.schema');
const validate = require('../../middleware/validationMiddleware');

// add Book controller
route.post('/', validate(AddBook), addBookController);

// update book controller
route.put('/:bookId', validate(UpdateBook), updateBookController);

// get All books and search book with query params
route.get('/', getBooksController);

// get Book by its unique ID
route.get('/:bookId', getBooksController);

// Delete bool by it ID
route.delete('/:bookId', deleteBookController);

module.exports = route;
