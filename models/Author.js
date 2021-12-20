const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
  authorId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('authors', AuthorSchema);
