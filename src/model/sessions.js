const db = require('../database/db');
const crypto = require('node:crypto');

// insert session into db
const create_session = db.prepare(/*sql*/ `
    INSERT INTO sessions (id, user_id, expires_at)
    VALUES ($id, $user_id, DATE('now', ('+4 days')))
`);

const createSession = (user_id) => {
  const id = crypto.randomBytes(18).toString('base64');
  create_session.run({ id, user_id });

  return id;
};

// retrieve session from db
const get_session = db.prepare(/*sql*/ `
  SELECT id, user_id, expires_at
  FROM sessions WHERE id = $session_id
`);

const getSession = (session_id) => {
  return get_session.get({ session_id });
};

// remove session from db
const remove_session = db.prepare(/*sql*/ `
  DELETE FROM sessions WHERE id = $session_id
`);

const removeSession = (session_id) => {
  remove_session.run({ session_id });
};

module.exports = { createSession, getSession, removeSession };
