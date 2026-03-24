const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: false },
  publishDate: { type: Date, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
