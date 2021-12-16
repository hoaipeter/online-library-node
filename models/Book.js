const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  isbn: String,
  pageCount: Number,
  publishedDate: Date,
  shortDescription: {
    type: String,
    required: true
  },
  longDescription: String,
  status: String,
  authors: {
    type: Array,
    required: true
  },
  categories: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('books', BookSchema);
