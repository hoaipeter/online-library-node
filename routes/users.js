const express = require('express');
const router = express.Router();
const User = require('../models/User');
const IssuedBook = require('../models/IssuedBook');
const authenticate = require('../middleware/authenticate');

router.get('/dashboard', authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get('/userBooks', authenticate, async (req, res) => {
  try {
    const books = await IssuedBook.find({ userId: req.rootUser._id });
    res.status(200).json(books);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete('/userBooks/:bookId', async (req, res) => {
  try {
    const removedBook = await IssuedBook.deleteOne({ _id: req.params.bookId });
    res.json(removedBook);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch('/:userId', async (req, res) => {
  try {
    const updatedUser = await User.updateOne({ _id: req.params.userId }, { $set: { role: req.body.role } });
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/', async (req, res) => {
  const { name, email, phone, role, password, cpassword } = req.body;

  if (!name || !email || !phone || !role || !password || !cpassword) {
    return res.status(422).json({ error: 'Please Enter All Details' });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: 'Email already exists' });
    }
    const user = new User({ name, email, phone, role, password, cpassword });
    await user.save();
    res.status(200).json({ message: 'user registered successfully' });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
