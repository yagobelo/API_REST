import express from "express";
import connectDatabase from "./src/database/db.js";
import usersRoutes from "./src/routes/usersRoutes.js";
import dotenv from "dotenv";
dotenv.config();

connectDatabase();

const app = express();

app.use(express.json());
app.use("/user", usersRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server status: OK =-=-=-= Runing in port: ${PORT}`);
});
