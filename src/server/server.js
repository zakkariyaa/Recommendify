require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

// routes
const home = require('../routes/home');
const signup = require('../routes/sign-up');
const { getSession } = require('../model/sessions');

// midleware
const server = express();
server.use(express.static('public'));
const bodyParser = express.urlencoded({ extended: true });
server.use(cookieParser(process.env.COOKIE_SECRET));
// check session from cookie
server.use((req, res, next) => {
  const sessionId = req.signedCookies.sid;
  const session = getSession(sessionId);

  if (session) {
    const expiryDate = new Date(session.expires_at);
    const currentDate = new Date();

    if (currentDate > expiryDate) {
      removeSession(sid);
      res.clearCookie('sid');
    } else {
      req.session = session;
    }
  }

  next();
});

server.get('/', home.get);
server.get('/sign-up', signup.get);
server.post('/sign-up', bodyParser, signup.post);

// server.post('/post', bodyParser, (req, res) => {
//   const { name, artist, song, spotify_url } = req.body;
//   const user = users.find((user) => user.name === name);

//   createPost({
//     user_id: user.id,
//     artist,
//     song,
//     spotify_url,
//   });

//   res.send(board(name, getAllPosts()));
// });

// server.post('/delete', bodyParser, (req, res) => {
//   const { name, post_id } = req.body;
//   console.log(`Deleting post ${post_id} for user ${name}`);

//   clearRatings();
//   deletePost(post_id);

//   res.send(board(name, getAllPosts()));
// });

module.exports = server;
