const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  thumbnailUrl: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  isbn: {
    type: String
  },
  pageCount: Number,
  publishedDate: {
    type: String
  },
  shortDescription: {
    type: String,
    required: true
  },
  longDescription: {
    type: String
  },
  status: String,
  isIssued: Boolean,
  author: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  categories: {
    type: Array,
    required: true
  }
});

BookSchema.index({
  title: 'text',
  isbn: 'text',
  shortDescription: 'text',
  longDescription: 'text',
  publishedDate: 'text',
  'author.name': 'text'
});

module.exports = mongoose.model('books', BookSchema);
