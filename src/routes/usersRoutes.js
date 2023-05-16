const router = require("express").Router();
const userController = require("../controllers/usersControllers");
const {
  validCreateNewUser,
  validUpdateUser,
} = require("../middlewares/globalMiddlewares");

router.post("/", validCreateNewUser, userController.createUser);
router.get("/", userController.readUser);
router.patch("/", validUpdateUser, userController.updateUser);
router.delete("/", userController.deleteUser);

module.exports = router;
