require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

// routes
const home = require('../routes/home');
const signup = require('../routes/sign-up');
const login = require('../routes/log-in');
const logout = require('../routes/log-out');
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
server.post('/', bodyParser, home.post);
server.get('/sign-up', signup.get);
server.post('/sign-up', bodyParser, signup.post);
server.get('/log-in', login.get);
server.post('/log-in', bodyParser, login.post);
server.post('/log-out', logout.post);

module.exports = server;
