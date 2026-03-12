import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema, 'Products');