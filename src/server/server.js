const express = require('express');
require('dotenv').config();
const home = require('../routes/home');

const server = express();
server.use(express.static('public'));
const bodyParser = express.urlencoded({ extended: true });

// const { getUsers } = require('../model/users');
// const { home, board } = require('./template');

// const users = getUsers();

server.get('/', home.get);

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
