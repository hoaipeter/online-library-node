const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GETS All BOOKS BACK
router.get('/', async (req, res) => {
  try {
    const { size, page } = req.query;

    const books = await Book.find()
      .limit(parseInt(size))
      .skip((parseInt(page) - 1) * parseInt(size))
      .sort({
        title: 'asc'
      });
    const bookCount = await Book.count();

    res.status(200).json({ books, count: bookCount });
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
    shortDescription: req.body.shortDescription,
    longDescription: req.body.longDescription,
    status: req.body.status,
    authors: req.body.authors.split(',').map((author) => author.trim()),
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

// Search books
router.post('/search', async (req, res) => {
  try {
    const { searchString } = req.body;
    const { size, page } = req.query;
    let books, bookCount;

    if (searchString === '') {
      books = await Book.find()
        .limit(parseInt(size))
        .skip((parseInt(page) - 1) * parseInt(size))
        .sort({
          title: 'asc'
        });
      bookCount = await Book.count();
    } else {
      books = await Book.find({ $text: { $search: searchString } }, { score: { $meta: 'textScore' } })
        .limit(parseInt(size))
        .skip((parseInt(page) - 1) * parseInt(size))
        .sort({
          score: { $meta: 'textScore' }
        });
      bookCount = await Book.count({ $text: { $search: searchString } });
    }

    res.status(201).json({ books, count: bookCount });
  } catch (err) {
    res.status(422).json({ message: err });
  }
});

module.exports = router;
