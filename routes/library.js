const express = require('express');
const router = express.Router();
const IssuedBook = require('../models/IssuedBook');
const Book = require('../models/Book');
const authenticate = require('../middleware/authenticate');

router.get('/library', authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.post('/issueBook', authenticate, async (req, res) => {
  const { title, bookId, userId, userName, issueDate, returnDate } = req.body;
  try {
    const bookExist = await IssuedBook.findOne({ title: title });
    if (bookExist) {
      return res.status(422).send({ error: 'Book Already Taken' });
    } else {
      const issueBook = new IssuedBook({ title, bookId, userId, userName, issueDate, returnDate });
      const updatedBook = await Book.updateOne({ _id: bookId }, { $set: { isIssued: true } });
      await issueBook.save();
      res.status(201).json({ message: 'Book Added' });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
