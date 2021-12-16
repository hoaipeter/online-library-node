const mongoose = require('mongoose');

const IssuedBookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  bookId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  }
});
module.exports = mongoose.model('issuedBooks', IssuedBookSchema);
