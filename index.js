const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");
const methodOverride = require("method-override");
const env = require("dotenv/config");

mongoose
  .connect(process.env.MONGO_STRING)
  .then(() => console.log("Mongo Connected"));

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const allProducts = await Product.find();
  res.render("products/allProducts", { allProducts });
});

// app.get("/fruits", async (req, res) => {
//   const allFruits = await Product.find({ category: "fruit" });

//   res.json(allFruits);
// });
app.get("/products/new", (req, res) => {
  res.render("products/newProduct");
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const foundProduct = await Product.findById(id);
  res.render("products/productDetail", { foundProduct });
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/editForm", { product });
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findOneAndDelete(id);
  res.redirect("/");
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.redirect(`/products/${id}`);
});

app.post("/products/new", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("App listening at port 3000");
});
