const db = require('../database/db');

const get_names = db.prepare(/*sql*/ `SELECT id, name FROM users`);

const getUsers = () => {
  return get_names.all();
};

module.exports = { getUsers };
