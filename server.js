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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
