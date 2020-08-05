const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const books = require("./routes/books");
const users = require("./routes/users");
const app = express();

app.use(express.json());

app.use("/api/v1/users", users);
app.use("/api/v1/books", books);

const PORT = process.env.PORT || 5322;

app.listen(PORT, () => {
  console.log("App listening on port 5322!");
});
