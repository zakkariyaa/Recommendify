const layout = require('../utils/layout');
const convertToEmbedURL = require('../utils/convertUrl');
const { getAllPosts } = require('../model/posts');
const { getUserById } = require('../model/users');

const get = (req, res) => {
  // check if user is signed in
  let user = null;
  const posts = getAllPosts();
  if (req.session) {
    user = getUserById(req.session.user_id);
  }

  const title = 'Music Recs';
  const postEls = posts.map((post) => {
    return /*html*/ `
    <article class="stack-s post_article">
        <p>By ${post.username}</p>
        <p class="artist">${post.artist}</p>
        <p class="song">${post.song}</p>
        <iframe style="border-radius:12px" src=${convertToEmbedURL(
          post.spotify_url
        )} width="80%" height="252" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <p class="posted_at">${post.posted_at}</p>
    </article>
    `;
  });

  const content = /*html*/ `
    <header class="flex posts_header">
        <h1>Hello, ${user ? user.name : 'Guest'}</h1>
        <div class="header_buttons">
            ${
              user
                ? `<form method="POST" action="/log-out">
                    <button type="submit">Log Out</button>
                  </form>`
                : `<a href="/sign-up">Sign Up</a>
                  <a href="/log-in">Log In</a>`
            }
        </div>
    </header>

    <main class="posts_section">
        <h2 class="music_recs_title">FAC27 Music Recs</h2>
        ${
          user
            ? /*html*/ `
          <footer>
            <button class="add_post" id="hideshow" onclick="
              const form = document.getElementById('addPostForm')
              if (form.style.display === 'block') form.style.display = 'none';
              else form.style.display = 'block';">
            <i class="uil uil-plus"></i></button>

            <form id="addPostForm" method='POST' style="display: none">
              <label for="artist">Artist: </label>
              <input type="text" name="artist" required>

              <label for="song">Song:</label>
              <input type="text" name="song" required>

              <label for="spotify_url">Spotify URL:</label>
              <input type="text" name="spotify_url" required>

              <input type="text" id="name" name="name" value=${user}>

              <button type="submit">Submit</button>
            </form>
          </footer>
        `
            : ''
        }

        ${postEls.join('')}
    </main>
    `;

  res.send(layout(title, content));
};

const post = (req, res) => {
  res.send('test');
};

module.exports = { get, post };
