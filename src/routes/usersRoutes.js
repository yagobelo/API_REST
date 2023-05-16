const router = require("express").Router();
const userControler = require("../controllers/usersControllers");

router.post("/", userControler.createUser);
router.get("/", userControler.readUser);
router.patch("/", userControler.updateUser);
router.delete("/", userControler.deleteUser);

module.exports = router;
