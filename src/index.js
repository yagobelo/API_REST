import express from "express";
import connectDatabase from "./database/db.js";
import dotenv from "dotenv";

import usersRoutes from "./routes/usersRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import swaggerRoutes from "./routes/swaggerRoutes.cjs";

dotenv.config();

connectDatabase();

const app = express();

app.use(express.json());
app.use("/user", usersRoutes);
app.use("/auth", authRoutes);
app.use("/news", newsRoutes);
app.use("/doc", swaggerRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server status: OK =-=-=-= Runing in port: ${PORT}`);
});
