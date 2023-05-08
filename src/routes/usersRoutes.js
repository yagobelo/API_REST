const router = require("express").Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { userName, email, password } = req.body;

  const verifyInvalidNewUser = [];
  const existNameUser = await User.findOne({ userName: userName });
  const existEmailUser = await User.findOne({ email: email });

  if (!userName) {
    verifyInvalidNewUser.push("Nome de usuario obrigatório!");
  }
  if (existNameUser) {
    verifyInvalidNewUser.push("Nome de usuario ja existe!");
  }

  if (!email) {
    verifyInvalidNewUser.push("Email obrigatório!");
  }
  if (existEmailUser) {
    verifyInvalidNewUser.push("Email de usuario ja existe!");
  }

  if (!password) {
    verifyInvalidNewUser.push("Senha obrigatória!");
  }
  if (password.length < 8) {
    verifyInvalidNewUser.push("Senha muito curta!");
  }

  if (verifyInvalidNewUser.length > 0) {
    return res.json(verifyInvalidNewUser);
  }
  try {
    const newUser = {
      userName,
      email,
      password,
    };
    User.create(newUser);
    res.json(newUser);
  } catch (error) {
    res.json("Erro interno ao criar novo usuario");
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json("Erro ao buscar usuarios");
    console.log(error);
  }
});

module.exports = router;
