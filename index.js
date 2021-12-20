const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://hungry-euler-9c01bf.netlify.app' : 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
  })
);
app.use(cookieParser());

// Import Routes
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const libraryRoutes = require('./routes/library');
const adminRoutes = require('./routes/admin');

app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use(authRoutes);
app.use(libraryRoutes);
app.use('/admin', adminRoutes);

// ROUTES
app.get('/', (req, res) => {
  res.send('We are on home');
});

// Connect to DB
mongoose.connect(
  // Change MongoDB uri here to your uri
  process.env.MONGODB_URI,
  { useNewUrlParser: true },
  () => {
    console.log('Connected to DB!');
  }
);

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}!`);
});
