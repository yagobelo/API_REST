import express from "express";
import connectDatabase from "./src/database/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
connectDatabase();

app.use(express.json());

import usersRoutes from "./src/routes/usersRoutes.js";
app.use("/user", usersRoutes);

app.get("/", (req, res) => {
  res.send("Rota Inicial!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server Connection: OK");
});
