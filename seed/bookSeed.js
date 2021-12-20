const mongoose = require('mongoose');
const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');
const Book = require('../models/Book');

let bookArray = [];

fs.createReadStream(path.resolve(__dirname, '', 'book.csv'))
  .pipe(csv.parse({ headers: true }))
  // pipe the parsed input into a csv formatter
  .pipe(csv.format({ headers: true }))
  // Using the transform function from the formatting stream
  .transform((row, next) => {
    // console.log(row.author_id);
    // console.log(row.authors);
    // console.log(row.pubdate);
    const publishedYear = row.pubdate && row.pubdate !== '' ? parseInt(row.pubdate.split(' ')[1]) : 0;

    bookArray.push({
      thumbnailUrl: '',
      title: row.title,
      isbn: row.isbn10 ? row.isbn10 : 0,
      pageCount: row.pages ? row.pages : 0,
      publishedDate: row.pubdate && row.pubdate !== '' ? row.pubdate : 'N/A',
      shortDescription: row.synopsis && row.synopsis !== '' ? row.synopsis : 'N/A',
      longDescription: row.overview && row.overview !== '' ? row.overview : 'N/A',
      status: publishedYear < new Date().getFullYear() ? 'PUBLISHED' : 'UNPUBLISHED',
      isIssued: false,
      categories: row.subjects.split(',').map((subject) => subject.trim()),
      author: {
        id: row.author_id ? row.author_id : 0,
        name: row.author && row.author !== '' ? row.author : 'N/A'
      }
    });

    return next(null);
  })
  .pipe(process.stdout)
  .on('end', () => process.exit());

const uri =
  'mongodb+srv://dbadmin:<your-password>@online-library-node.kyvwc.mongodb.net/online-library?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true }, () => {
  Book.collection.drop();

  Book.create(bookArray)
    .then((book) => {
      console.log(`${book.length} books created`);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      mongoose.connection.close();
    });
});
