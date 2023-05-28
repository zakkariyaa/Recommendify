# recRoom

## Installation

Run the following command to clone the directory:

```
git clone https://github.com/fac27/recRoom/
```
Then open the project in your code editor.

Run the following command to install dependencies:
```
npm install
```

And this command to start the server:
```
npm run dev
```
And finally navigate to http://localhost:8080/ to see the site.


## Database design

This app uses MySqlite file-based database for persistent storage. Data is arranged in three tables: users, posts and ratings. Tables' fields and relations to other tables can be seen in the following database diagram:

![recRoom database diagram](https://github.com/fac27/recRoom/assets/32879360/5b83b1c2-d236-414d-b675-ec34672260c9)

## User Stories

- [x] As a user I want to recomend individual songs via spotify links
- [x] As a user I want to recommend songs to my cohort
- [x] As a user I want to read others recomnedations
- [ ] As a user I want to be able to upvote or downvote other's recomendations
- [x] As a user I want to be able to tell the site who I am


### Stretch Stories
- [ ] As a user I want to be able to sort posts by popularity/time
- [ ] As a user I want to be able to edit posts I have made
- [x] As a user I want to be able to delete my own posts
