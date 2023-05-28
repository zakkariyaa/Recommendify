const express = require('express');

const server = express();
// const bodyParser = express.urlencoded({ extended: true });

// const {
//   getAllPosts,
//   createPost,
//   deletePost,
//   clearRatings,
// } = require('../model/posts');
// const { getUsers } = require('../model/users');
// const { home, board } = require('./template');

// server.use(express.static('public'));

// const users = getUsers();

server.get('/', (req, res) => {
  res.send('test');
});

// server.post('/', bodyParser, (req, res) => {
//   const { name } = req.body;
//   const names = users.map((user) => user.name);

//   if (names.includes(name)) {
//     res.send(board(name, getAllPosts()));
//   } else {
//     res.redirect('/');
//   }
// });

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
