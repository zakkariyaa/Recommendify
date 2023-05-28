BEGIN;

INSERT INTO users (id, name, email, username, hash, location, bio, created_at) VALUES
(1, 'mark', 'a@example.com', 'mark', '$2a$12$A74tKw96m82AEZpJrIEQxecZGscKayJD/hD5/I6DuqKEJoQlAlNYO', 'London', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu.', '2016-12-25 00:00:00'),
(2, 'taha', 'b@example.com', 'taha', '$2a$12$o2NP8ykiki.T11qRQOCnBeX68PhwXHprM/hxHkbAfqotWo2XT.vdW', 'New York', 'Maecenas at pretium metus, id gravida quam. Sed pulvinar lorem.', '2017-12-25 00:00:00'),
(3, 'zak', 'c@example.com', 'zak', '$2a$12$8HIQ9kqN0brBUfDigfSfB.9BlSsICw4LQ/tiw4U/zMW5QWtuTqMG6', 'Toronto', 'Quisque magna lorem, sagittis at felis sed, ultricies sagittis odio.', '2018-12-25 00:00:00'),
(4, 'cameo', 'd@example.com', 'cameo', '$2a$12$vpUb03L0WVHMfrHducL2SumogekzuPfh9Ych0Il8Zkt5Baqch7QZq', 'Berlin', 'Proin commodo elit id eros bibendum, vitae porta ex sollicitudin.', '2019-12-25 00:00:00')
ON CONFLICT DO NOTHING;

INSERT INTO posts (id, artist, song, spotify_url, user_id) VALUES
(1, 'elvis presley', 'jailhouse rock', 'https://open.spotify.com/track/4gphxUgq0JSFv2BCLhNDiE?si=ed369955e7354e25', 3),
(2, 'dolly parton', 'jolene', 'https://open.spotify.com/track/2SpEHTbUuebeLkgs9QB7Ue?si=cf4c20a5c7664626', 4),
(3, 'tool', 'schism', 'https://open.spotify.com/track/55mJleti2WfWEFNFcBduhc?si=361fbddf3c4a4397', 2),
(4, 'britney spears', 'toxic', 'https://open.spotify.com/track/6I9VzXrHxO9rA9A5euc8Ak?si=fedc7ca679844c63', 1)
ON CONFLICT DO NOTHING;

INSERT INTO ratings (id, user_id, post_id) VALUES
(1, 3, 2),
(2, 1, 3),
(3, 2, 1),
(4, 4, 4)
ON CONFLICT DO NOTHING;

COMMIT;
