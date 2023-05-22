import express from "express";
import newsControllers from "../controllers/newsControllers.js";
import { validCreateNews } from "../middlewares/globalMiddlewares.js";

const router = express.Router();

router.post("/", validCreateNews, newsControllers.createNews);
router.get("/", newsControllers.findAllNews);

export default router;
