const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5322;

app.listen(PORT, () => {
  console.log("App listening on port 5322!");
});
