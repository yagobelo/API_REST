import express from "express";
import {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
} from "../controllers/usersControllers.js";
import {
  validCreateNewUser,
  validUpdateUser,
} from "../middlewares/globalMiddlewares.js";

const router = express.Router();

router.post("/", validCreateNewUser, createUser);
router.get("/", findAllUsers);
router.get("/:id", findUserById);
router.patch("/:id", validUpdateUser, updateUser);

export default router;
