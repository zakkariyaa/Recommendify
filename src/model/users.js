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
const get_user = db.prepare(/*sql*/ `
  SELECT id, name, email, username, hash, location, bio
  FROM users WHERE id = $user_id
`);

const getUser = (user_id) => {
  return get_user.get({ user_id });
};

module.exports = { createUser, getUser };
