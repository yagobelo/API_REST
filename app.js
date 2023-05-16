const express = require("express");
const app = express();
const connectDatabase = require("./src/database/db");
require("dotenv").config();

connectDatabase();
app.use(express.json());

const usersRoutes = require("./src/routes/usersRoutes");
app.use("/user", usersRoutes);

app.get("/", (req, res) => {
  res.send("Rota Inicial!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server Connection: OK");
});
