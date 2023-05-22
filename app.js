import express from "express";
import connectDatabase from "./src/database/db.js";
import dotenv from "dotenv";

import usersRoutes from "./src/routes/usersRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import newsRoutes from "./src/routes/newsRoutes.js";

dotenv.config();

connectDatabase();

const app = express();

app.use(express.json());
app.use("/user", usersRoutes);
app.use("/auth", authRoutes);
app.use("/news", newsRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server status: OK =-=-=-= Runing in port: ${PORT}`);
});
