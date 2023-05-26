import express from "express";
import newsControllers from "../controllers/newsControllers.js";
import { validCreateNews } from "../middlewares/globalMiddlewares.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/", authMiddleware, validCreateNews, newsControllers.createNews);
router.get("/", newsControllers.findAllNews);
router.get("/top", newsControllers.topNews);

export default router;
