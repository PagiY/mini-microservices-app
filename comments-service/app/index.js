const express = require("express");
// for generating random id
const { randomBytes } = require("crypto");

// create an express app
const app = express();

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

app.listen(4001, () => {
  console.log("Listening on PORT 4001")
});
