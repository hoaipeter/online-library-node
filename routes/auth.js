const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { registerValidation } = require('../validation/validation');

router.post('/register', async (req, res) => {
  const { firstname, lastname, email, phone, role, password, cpassword } = req.body;

  if (!firstname || !lastname || !email || !phone || !role || !password || !cpassword) {
    return res.status(422).json({ error: 'Please Enter All Details' });
  }
  // Validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(422).json({ error: error.details[0].message });

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: 'Email already exists' });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: 'Passwords are not matching' });
    } else {
      const user = new User({ firstname, lastname, email, phone, role, password, cpassword });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/signin', async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Please Enter the details' });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      // JWT Auth
      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie('jwtoken', token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
        sameSite: 'none',
        secure: true
      });

      if (!isMatch) {
        res.status(400).json({ message: 'Invalid Credentials' });
      } else {
        res.json({ message: 'User Logged in Successfully', email: email });
      }
    } else {
      res.status(400).json({ message: 'Invalid Credentials' });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('jwtoken', { path: '/' });
  res.status(200).send('User Logged out');
});

module.exports = router;
