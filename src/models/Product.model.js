const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// it will create a collection in data with plural name i.e products
const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
