const db = require('../database/db');

// insert user into db
const create_user = db.prepare(/*sql*/ `
  INSERT INTO users (name, email, username, hash, location, bio)
  VALUES ($name, $email, $username, $hash, $location, $bio)
  RETURNING id
`);

const createUser = (name, email, username, hash, location, bio) => {
  return create_user.get({ name, email, username, hash, location, bio });
};

// retrieve user from db
const get_user_by_id = db.prepare(/*sql*/ `
  SELECT id, name, email, username, hash, location, bio
  FROM users WHERE id = $user_id
`);

const getUserById = (user_id) => {
  return get_user_by_id.get({ user_id });
};

const get_user_by_email = db.prepare(/*sql*/ `
  SELECT id, name, email, username, hash, location, bio
  FROM users WHERE email = $email
`);

const getUserByEmail = (email) => {
  return get_user_by_email.get({ email });
};

module.exports = { createUser, getUserById, getUserByEmail };
