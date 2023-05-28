const db = require('../database/db');

const get_all_posts = db.prepare(/*sql*/ `
  SELECT
    posts.id AS post_id,
    posts.artist,
    posts.song,
    posts.spotify_url,
    posts.posted_at,
    users.username
  FROM posts JOIN users ON posts.user_id = users.id
  ORDER BY posted_at DESC
`);

const getAllPosts = () => {
  return get_all_posts.all();
};

// const create_post = db.prepare(/*sql*/ `
//   INSERT INTO posts (
//     user_id,
//     artist,
//     song,
//     spotify_url)
//   VALUES (
//     $user_id,
//     $artist,
//     $song,
//     $spotify_url)
//   RETURNING id
//   `);

// const createPost = ({ user_id, artist, song, spotify_url }) => {
//   return create_post.get({ user_id, artist, song, spotify_url });
// };

// const delete_post = db.prepare(/*sql*/ `
//   DELETE FROM posts
//   WHERE id = $post_id
// `);

// const deletePost = (post_id) => {
//   delete_post.run({ post_id });
// };

// const clear_ratings = db.prepare(/*sql*/ `
//   DELETE FROM ratings
// `);

// const clearRatings = () => {
//   clear_ratings.run();
// };

module.exports = { getAllPosts };
