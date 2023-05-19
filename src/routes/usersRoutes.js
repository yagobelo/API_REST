import express from "express";
import userController from "../controllers/usersControllers.js";
import {
  validCreateNewUser,
  validUpdateUser,
} from "../middlewares/globalMiddlewares.js";

const router = express.Router();

router.post("/", validCreateNewUser, userController.createUser);
router.get("/", userController.findAllUsers);
router.get("/:id", userController.findUserById);
router.patch("/", validUpdateUser, userController.updateUser);
router.delete("/", userController.deleteUser);

export default router;
