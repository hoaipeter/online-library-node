const mongoose = require('mongoose');
const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');
const Author = require('../models/Author');

let authorArray = [];

fs.createReadStream(path.resolve(__dirname, '', 'author.csv'))
  .pipe(csv.parse({ headers: true }))
  // pipe the parsed input into a csv formatter
  .pipe(csv.format({ headers: true }))
  // Using the transform function from the formatting stream
  .transform((row, next) => {
    // console.log(row.id);
    // console.log(row.title);
    // console.log(row.biography);

    authorArray.push({
      authorId: row.id ? row.id : 0,
      name: row.title && row.title !== '' ? row.title : 'N/A',
      bio: row.biography
    });

    return next(null);
  })
  .pipe(process.stdout)
  .on('end', () => process.exit());

const uri =
  'mongodb+srv://dbadmin:<your-password>@online-library-node.kyvwc.mongodb.net/online-library?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true }, () => {
  Author.collection.drop();

  Author.create(authorArray)
    .then((author) => {
      console.log(`${author.length} authors created`);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      mongoose.connection.close();
    });
});
