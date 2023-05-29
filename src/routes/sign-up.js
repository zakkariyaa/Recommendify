const layout = require('../utils/layout');
const { createUser } = require('../model/users');
const { createSession } = require('../model/sessions');

const bcrypt = require('bcryptjs');

const get = (req, res) => {
  const title = 'Create an account';
  const content = /*html*/ `
    <div class="stack-m signup_div">
      <h1>${title}</h1>
      <form method="POST" class="stack-s">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>

        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>

        <label for="username">Username</label>
        <input type="text" id="username" name="username" required>

        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>

        <label for="location">Location</label>
        <input type="text" id="location" name="location" required>

        <label for="bio">Bio</label>
        <input type="text" id="bio" name="bio" required>

        <button type="submit">Sign up</button>
      </form>
    </div>
  `;

  res.send(layout(title, content));
};

const post = async (req, res) => {
  const { name, email, username, password, location, bio } = req.body;

  if (!name || !email || !username || !password || !location || !bio) {
    res.status(400).send('Bad input');
  } else {
    const hash = await bcrypt.hash(password, 12);
    const userId = createUser(name, email, username, hash, location, bio).id;
    const sessionId = createSession(userId);

    res.cookie('sid', sessionId, {
      signed: true,
      httpOnly: true,
      // store cookie for 12 hours
      maxAge: 12 * 60 * 60 * 1000,
      sameSite: 'lax',
    });

    res.redirect('/');
  }
};

module.exports = { get, post };
