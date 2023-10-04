const { asyncErrorHandler, AppError } = require('../../utils/errorController');
const { Product } = require('./products.model');

const addProductController = asyncErrorHandler(async (req, res, next) => {
  const product = new Product(req.body);
  const result = await product.save();
  res.status(200).send(result);
});

const getProductController = asyncErrorHandler(async (req, res, next) => {
  // const result = await Product.find({}, { name: 1, _id: 0, price: 1 });
  // const result = await Product.find({ price: 1599 }, { __v: 0 });
  const result = await Product.find({}, { __v: 0 });
  res.status(200).send(result);
});

const getProductByIdController = asyncErrorHandler(async (req, res, next) => {
  const result = await Product.findById(req.params.productId);
  // const result = await Product.findOne({ _id: req.params.productId });
  if (!result) {
    throw new AppError('Product not found', 404);
  }
  res.status(200).send(result);
});

const deleteProductByIdController = asyncErrorHandler(
  async (req, res, next) => {
    // const result = await Product.findOneAndDelete({
    //   _id: req.params.productId,
    // });
    const result = await Product.findByIdAndDelete(req.params.productId);
    if (!result) {
      throw new AppError(
        'The product you want to delete is not available',
        400
      );
    }
    res.status(200).send(result);
  }
);

const updateProductByIdController = asyncErrorHandler(
  async (req, res, next) => {
    const options = {
      new: true,
    };
    const result = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      options
    );
    if (!result) {
      throw new AppError('The product you want to update does not exist', 400);
    }
    res.send(result);
  }
);

module.exports = {
  addProductController,
  getProductController,
  getProductByIdController,
  deleteProductByIdController,
  updateProductByIdController,
};
