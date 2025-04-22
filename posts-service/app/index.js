const express = require("express");
const cors = require('cors');
const { randomBytes } = require("crypto");

const app = express();
app.use(express.json());
app.use(cors());

// save responses in memory
const posts = {};

app.get('/post', (req, res) => {
  res.send(posts);
});

app.post('/post', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id, title
  }
  res.status(201).send(posts[id]);
});

app.listen(4000, () => console.log('Listening on PORT 4000'))