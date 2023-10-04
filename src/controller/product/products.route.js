const express = require('express');
const route = express.Router();

const {
  addProductController,
  getProductController,
  getProductByIdController,
  deleteProductByIdController,
  updateProductByIdController,
} = require('./products.controller');
const { productSchema } = require('./products.schema');
const validate = require('../../middleware/validationMiddleware');

// add product in db
route.post('/', validate(productSchema), addProductController);

// get product from db
route.get('/', getProductController);

// get product by ID
route.get('/:productId', getProductByIdController);

// delete product by ID
route.delete('/:productId', deleteProductByIdController);

// Update product by its ID
route.patch('/:productId', updateProductByIdController);

module.exports = route;
