const express = require('express');
const router = express.Router();
const IssuedBook = require('../models/IssuedBook');
const authenticate = require('../middleware/authenticate');

router.get('/dashboard', authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get('/issuedBooks', authenticate, async (req, res) => {
  try {
    const books = await IssuedBook.find();
    res.status(200).json(books);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/adminBooks', authenticate, async (req, res) => {
  try {
    const books = await IssuedBook.find({ userId: req.rootUser._id });
    res.status(200).json(books);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete('/adminBooks/:bookId', async (req, res) => {
  try {
    const removedBook = await IssuedBook.deleteOne({ _id: req.params.bookId });
    res.json(removedBook);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
