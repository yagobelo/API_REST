import express from "express";
import {
  createNews,
  findAllNews,
  topNews,
  findNewsById,
  findNewsByTitle,
  findNewsByUser,
} from "../controllers/newsControllers.js";
import { validCreateNews } from "../middlewares/globalMiddlewares.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/", authMiddleware, validCreateNews, createNews);
router.get("/", findAllNews);
router.get("/top", topNews);
router.get("/search", findNewsByTitle);
router.get("/byuser", authMiddleware, findNewsByUser);

router.get("/:id", authMiddleware, findNewsById);

export default router;
