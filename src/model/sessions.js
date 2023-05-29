const db = require('../database/db');
const crypto = require('node:crypto');

const create_session = db.prepare(/*sql*/ `
    INSERT INTO sessions (id, user_id, expires_at)
    VALUES ($id, $user_id, DATE('now', ('+4 days')))
`);

const createSession = (user_id) => {
  const id = crypto.randomBytes(18).toString('base64');
  create_session.run({ id, user_id });

  return id;
};

const get_session = db.prepare(/*sql*/ `
  SELECT id, user_id, expires_at
  FROM sessions WHERE id = $session_id
`);

const getSession = (session_id) => {
  return get_session.get({ session_id });
};

module.exports = { createSession, getSession };
