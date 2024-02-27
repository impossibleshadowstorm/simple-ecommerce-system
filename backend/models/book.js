const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    set: (value) => parseFloat(value.toFixed(2)),
  },
  rating: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  sku: {
    type: Number,
    required: true,
  },
});

bookSchema.virtual("status").get(function () {
  if (this.sku > 3) {
    return "In Stock";
  } else if (this.sku === 1) {
    return "Last";
  } else {
    return "Nearly Sold";
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
