const convertToEmbedURL = require('./convertUrl');
const layout = (title, content) => {
  return /*html*/ `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
        <!-- ICONSCOUT CDN LINK -->
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
        <link rel="stylesheet" href="style.css" />
        <title>${title}</title>
      </head>
      <body class="center stack-xl">
        ${content}
      </body>
    </html>
  `;
};

const home = () => {
  const names = [
    'alphonso',
    'cameo',
    'beth',
    'mark',
    'simon',
    'taha',
    'tom',
    'zack',
  ];

  const nameEls = names.map((name) => {
    return /*html*/ `
        <div>
        <input type="radio" id=${name} name="name" value=${name} required>
        <label for=${name}>${name[0].toUpperCase()}${name.slice(1)}</label><br>
        </div>
    `;
  });

  const title = 'Choose name';
  const content = /*html*/ `
    <main class="main__login">
        <form class="names_form stack-m" method="POST" action="/">
            <p class="select_name">Your name:</p>

            ${nameEls.join('')}

            <button class="reset_name" type="reset">Reset</button>
            <button class="submit_name" type="submit">Submit</button>
        </form>
    </main>
  `;

  return layout(title, content);
};

function board(user, posts) {
  const title = 'Music Recs';
  const postEls = posts.map((post) => {
    return /*html*/ `
    <article class="stack-s post_article">
        <p>By ${post.user_name}</p>
        <p class="artist">${post.artist}</p>
        <p class="song">${post.song}</p>
        <iframe style="border-radius:12px" src=${convertToEmbedURL(
          post.spotify_url
        )} width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <p class="posted_at">${post.posted_at}</p>
        <form class="delete_form" method="POST" action="/delete">
            <input type="hidden" name="name" value="${user}">
            <input type="hidden" name="post_id" value="${post.post_id}">
            <button class="delete_post" type="submit"><i class="uil uil-trash-alt"></i></button>
        </form>
    </article>
    `;
  });

  const content = /*html*/ `
    <header class="posts_header">
        <h1>Hello, ${user[0].toUpperCase()}${user.slice(1)}</h1>
    </header>

    <main class="posts_section">
        <h2 class="music_recs_title">FAC27 Music Recs</h2>
        ${postEls.join('')}
    </main>
    ${addPost(user)}
    `;

  return layout(title, content);
}

const addPost = (user) => {
  return /*html*/ `
    <footer>
        <button class="add_post" id="hideshow" onclick="
            const form = document.getElementById('addPostForm')
            if (form.style.display === 'block') form.style.display = 'none';
            else form.style.display = 'block';">
        <i class="uil uil-plus"></i></button>

        <form id="addPostForm" method='POST' action='/post' style="display: none">
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
    `;
};

module.exports = { home, board };
