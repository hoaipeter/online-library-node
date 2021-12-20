# Online Library - Backend

A Node.js app using [Express 4](http://expressjs.com/) to build a backend for library app.

## Technologies:
Node.js, Express, Mongoose, jsonwebtoken, joi, cors

## Server
The app is hosted on Heroku with [API Url](https://online-library-api.herokuapp.com)

## How to run
Make sure you have [Node.js](http://nodejs.org/) installed.

1)
```sh
$ git clone https://git.heroku.com/online-library-api.git # or clone your own fork
$ cd online-library-node
$ npm install
```
2) Go to 4 files [authorSeed.js](seed/authorSeed.js), [bookSeed.js](seed/bookSeed.js), [userSeed.js](seed/userSeed.js), 
[index.js](index.js) to change the mongodb uri to your mongodb uri
3) 
```sh
$ npm seed_user
$ npm seed_book
$ npm seed_author
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).
