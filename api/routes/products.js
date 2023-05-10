const Product = require("../models/Product.js");
const express = require("express");
const router = express.Router();
//read (get all Product)
router.get("/get-all", async (req, res) => {
  try {
    const products = await Product.find();
    //res.send(products);
    // res.send ile aynı sonucu verir
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});
// create
router.post("/add-product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json("Item added successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});
//update
router.put("/update-product", async (req, res) => {
  try {
    await Product.findOneAndUpdate({ _id: req.body.productID }, req.body);

    res.status(200).json("Item updated successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});
// delete
router.delete("/delete-product", async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.body.productID });

    res.status(200).json("Item deleted successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
