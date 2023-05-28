import express from "express";
import {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
} from "../controllers/usersControllers.js";
import {
  validCreateNewUser,
  validUpdateUser,
} from "../middlewares/globalMiddlewares.js";

const router = express.Router();

router.post("/", validCreateNewUser, createUser);
router.get("/", findAllUsers);
router.get("/:id", findUserById);
router.patch("/", validUpdateUser, updateUser);
router.delete("/", deleteUser);

export default router;
