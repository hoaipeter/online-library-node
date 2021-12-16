const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv/config');
// const path = require('path');
const PORT = process.env.PORT || 5000;

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: 'https://hungry-euler-9c01bf.netlify.app',
    credentials: true
  })
);
app.use(cookieParser());

// Import Routes
const bookRoutes = require('./routes/books');
const serviceRoutes = require('./routes/services');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const libraryRoutes = require('./routes/library');
const adminRoutes = require('./routes/admin');

app.use('/books', bookRoutes);
app.use('/services', serviceRoutes);
app.use('/users', userRoutes);
app.use(authRoutes);
app.use(libraryRoutes);
app.use('/admin', adminRoutes);

// ROUTES
app.get('/', (req, res) => {
  res.send('We are on home');
});

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log('Connected to DB!');
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}!`);
});
