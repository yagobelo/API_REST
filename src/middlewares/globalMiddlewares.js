const User = require("../models/User");

const validPassword = async (password, verifyInvalidNewUser) => {
  if (password.length < 8) {
    verifyInvalidNewUser.push("Senha muito curta!");
  }
  const passwordContainUpperCase = /[A-Z]/.test(password);
  if (!passwordContainUpperCase) {
    verifyInvalidNewUser.push("Senha fraca, deve conter letra maiúscula!");
  }
  const passwordContainLowerCase = /[a-z]/.test(password);
  if (!passwordContainLowerCase) {
    verifyInvalidNewUser.push("Senha fraca, deve conter letra minúscula!");
  }
  const passwordContainNumber = /\d/.test(password);
  if (!passwordContainNumber) {
    verifyInvalidNewUser.push("Senha fraca, deve conter número!");
  }
  const passwordContainSpecialCharacter =
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  if (!passwordContainSpecialCharacter) {
    verifyInvalidNewUser.push("Senha fraca, deve conter caractere especial!");
  }
};

const validCreateNewUser = async (req, res, next) => {
  const { userName, email, password } = req.body;

  const verifyInvalidNewUser = [];

  if (!userName) {
    verifyInvalidNewUser.push("Nome de usuario obrigatório!");
  }
  if (userName.length < 4) {
    verifyInvalidNewUser.push(
      "Nome de usuario deve conter no minimo 4 caracteres!"
    );
  }
  const existNameUser = await User.findOne({ userName: userName });
  if (existNameUser) {
    verifyInvalidNewUser.push("Nome de usuario ja existe!");
  }

  if (!email) {
    verifyInvalidNewUser.push("Email obrigatório!");
  }
  const existEmailUser = await User.findOne({ email: email });
  if (existEmailUser) {
    verifyInvalidNewUser.push("Email de usuario ja existe!");
  }

  validPassword(password, verifyInvalidNewUser);

  if (verifyInvalidNewUser.length > 0) {
    return res.json({ message: verifyInvalidNewUser });
  }
  next();
};

const validUpdateUser = async (req, res, next) => {
  const email = req.query.email;
  const { userName, password } = req.body;
  const verifyInvalidNewUser = [];

  if (!userName && !password) {
    verifyInvalidNewUser.push(
      "Digite um username ou uma senha para fazer alteração!"
    );
  }
  if (userName) {
    const existNameUser = await User.findOne({ userName: userName });
    if (existNameUser) {
      verifyInvalidNewUser.push("Nome de usuario ja existe!");
    }
    if (userName.length < 4) {
      verifyInvalidNewUser.push(
        "Nome de usuario deve conter no minimo 4 caracteres!"
      );
    }
  }

  validPassword(password, verifyInvalidNewUser);

  if (verifyInvalidNewUser.length > 0) {
    return res.json({ message: verifyInvalidNewUser });
  }
  next();
};

module.exports = { validCreateNewUser, validUpdateUser };
