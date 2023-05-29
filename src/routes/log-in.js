const layout = require('../utils/layout.js');
const { getUserByEmail } = require('../model/users');
const { createSession } = require('../model/sessions.js');

const bcrypt = require('bcryptjs');

const get = (req, res) => {
  const title = 'Log in to your account';
  const content = /*html*/ `
    <div class="stack-m login_div">
      <h1>${title}</h1>

      <form method="POST" class="stack-s">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>

        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>

        <button type="submit">Log in</button>
      </form>
    </div>
  `;

  res.send(layout(title, content));
};

const post = async (req, res) => {
  const { email, password } = req.body;
  const user = getUserByEmail(email);
  const match = await bcrypt.compare(password, user.hash);

  if (!email || !password || !user || !match) {
    return res.status(400).redirect('/log-in');
  }

  const sessionId = createSession(user.id);
  res.cookie('sid', sessionId, {
    signed: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'lax',
  });

  res.redirect('/');
};

module.exports = { get, post };
