const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
  .connect(process.env.MONGO_STRING)
  .then(() => console.log("Mongo Connected"));

// const p1 = new Product({
//   name: "Ruby Grapefruit",
//   price: 2,
//   category: "fruit",
// });

// p1.save()
//   .then((d) => console.log(d))
//   .catch((e) => console.log(e));

const seedProducts = [
  {
    name: "Forage Bananas",
    price: 3.4,
    category: "fruit",
  },
  {
    name: "Fairy Onions",
    price: 1.4,
    category: "vegetable",
  },
  {
    name: "Risky Potatoes",
    price: 5.4,
    category: "vegetable",
  },
  {
    name: "Delight Chocolates",
    price: 9.7,
    category: "dairy",
  },
  {
    name: "Crouching Muskmelons",
    price: 3.8,
    category: "fruit",
  },
];

Product.insertMany(seedProducts)
  .then((data) => {
    console.log(data);
  })
  .catch((c) => console.log(c));
