const express = require("express");
const { query } = require("./models");

const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const result = await query(
    "INSERT INTO users (name, email, created_at) VALUES ($1, $2, NOW()) RETURNING *",
    [name, email],
  );
  res.json(result.rows[0]);
});

app.get("/users", async (req, res) => {
  const result = await query("SELECT * FROM users");
  res.json(result.rows);
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const result = await query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id],
  );
  res.json(result.rows[0]);
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await query("DELETE FROM users WHERE id = $1", [id]);
  res.json({ message: "User deleted" });
});

app.post("/posts", async (req, res) => {
  const { user_id, title, content } = req.body;
  const result = await query(
    "INSERT INTO posts (user_id, title, content, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
    [user_id, title, content],
  );
  res.json(result.rows[0]);
});

app.get("/posts", async (req, res) => {
  const result = await query("SELECT * FROM posts");
  res.json(result.rows);
});

app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const result = await query(
    "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *",
    [title, content, id],
  );
  res.json(result.rows[0]);
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  await query("DELETE FROM posts WHERE id = $1", [id]);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
