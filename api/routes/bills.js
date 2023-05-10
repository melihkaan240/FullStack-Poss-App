const Bill = require("../models/Bill.js");
const express = require("express");
const router = express.Router();
//read (get all Bill)
router.get("/get-all", async (req, res) => {
  try {
    const bills = await Bill.find();
    //res.send(Bill);
    // res.send ile aynı sonucu verir
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json(error);
  }
});
// create
router.post("/add-bill", async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(200).json("Item added successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
