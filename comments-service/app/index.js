const express = require("express");
const cors = require('cors');
// for generating random id
const { randomBytes } = require("crypto");

// create an express app
const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/post/:id/comment', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/post/:id/comment', (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const { id } = req.params;
  const comments = commentsByPostId[id] || [];

  comments.push({ id: commentId, content })
  commentsByPostId[id] = comments;

  res.status(201).send(commentsByPostId);
});

// listen to port 4001 since port 4000 is taken by posts-service
app.listen(4001, () => {
  console.log("Listening on PORT 4001")
});
