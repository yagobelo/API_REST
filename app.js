const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());

const usersRoutes = require("./src/routes/usersRoutes");
app.use("/user", usersRoutes);

app.get("/", (req, res) => {
  res.send("Rota Inicial!");
});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT;

mongoose
  .connect(
    `mongodb://${DB_USER}:${DB_PASSWORD}@ac-pn89l6z-shard-00-00.h9ghu3h.mongodb.net:27017,ac-pn89l6z-shard-00-01.h9ghu3h.mongodb.net:27017,ac-pn89l6z-shard-00-02.h9ghu3h.mongodb.net:27017/${DB_NAME}?ssl=true&replicaSet=atlas-2v89wv-shard-0&authSource=admin&retryWrites=true&w=majority` /* `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.h9ghu3h.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`*/,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connection with MongoDB: OK");
    app.listen(PORT, () => {
      console.log("Server Connection: OK");
    });
  })
  .catch((err) => {
    console.log("Error on connection with MongoDB: " + err);
  });
