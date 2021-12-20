const mongoose = require('mongoose');
const User = require('../models/User');

// Connection URL
const uri =
  'mongodb+srv://dbadmin:<your-password>@online-library-node.kyvwc.mongodb.net/online-library?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true }, () => {
  User.collection.drop();

  User.create([
    {
      firstname: 'Admin',
      lastname: 'Seed',
      email: 'admin@admin.com',
      phone: '123456789',
      role: 'admin',
      password: 'passwordadmin',
      cpassword: 'passwordadmin'
    }
  ])
    .then((user) => {
      console.log(`${user.length} users created`);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      mongoose.connection.close();
    });
});
