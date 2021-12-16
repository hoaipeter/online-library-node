const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GETS All BOOKS BACK
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.json({ message: err });
  }
});

// SUBMITS A BOOK
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    isbn: req.body.isbn,
    pageCount: req.body.pageCount,
    publishedDate: req.body.publishedDate,
    thumbnailUrl: req.body.thumbnailUrl,
    shortDescription: req.body.shortDescription,
    longDescription: req.body.longDescription,
    status: req.body.status,
    authors: req.body.authors,
    categories: req.body.categories
  });

  try {
    const savedBook = await book.save();
    res.json(savedBook);
  } catch (err) {
    res.json({ message: err });
  }
});

//SPECIFIC BOOK
router.get('/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    res.json(book);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE POST
router.delete('/:bookId', async (req, res) => {
  try {
    const removedBook = await Book.deleteOne({ _id: req.params.bookId });
    res.json(removedBook);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE A BOOK
router.patch('/:bookId', async (req, res) => {
  try {
    const updatedBook = await Book.updateOne({ _id: req.params.bookId }, { $set: { title: req.body.title } });
    res.json(updatedBook);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
