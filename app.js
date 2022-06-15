const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.json());
const port = 5000;

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  createAt: Date,
});
const ProductModel = mongoose.model("Product", productSchema);
mongoose.connect("mongodb://localhost:27017/labphase1", () => {
  console.log("mongodb started");
});

app.post("/products", async (req, res) => {
  const data = new ProductModel({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: parseFloat(req.body.price),
    createAt: Date.now(),
  });

  product = await data.save();
  return res.status(200).json(product);
});

app.get("/products", async (req, res) => {
  const data = await ProductModel.find();
  res.status(200).json(data);
});
app.get("/products/:id", async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    return res.status(200).json(product);
  }
  return res.status(404).json({ message: "Data not found" });
});

app.get("/products/:id", async (req, res) => {
  const data = await ProductModel.find();
  res.status(200).json(data);
});

app.put("/products/:id", async (req, res) => {
  const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body);
  if (product) {
    return res.status(200).json(product);
  }
  res.status(404).json({ message: "Data not found" });
});
app.delete("/products/:id", (req, res) => {
  let id = req.params.id;
  let product = null;
  if (id) {
    product = products.filter((product) => product.id !== id);
    res.status(200).json(product);
  }
  res.status(404).json({ message: "Data not found" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
