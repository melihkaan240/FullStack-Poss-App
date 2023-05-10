const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    img: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: String, require: true },
  },
  { timestamp: true }
);

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;
