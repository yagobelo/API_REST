const User = require("../models/User");

const createUser = async (req, res) => {
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

  if (!password) {
    verifyInvalidNewUser.push("Senha obrigatória!");
  }
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
};

const readUser = async (req, res) => {
  const userName = req.query.userName;
  try {
    if (!userName) {
      const allUsers = await User.find();
      if (!allUsers) {
        return res.json("Nenhum usuario encontrado!");
      }
      res.json(allUsers);
    } else {
      const userByUsername = await User.findOne({ userName: userName });
      if (!userByUsername) {
        return res.json("Usuario não encontrado!");
      }
      res.json(userByUsername);
    }
  } catch (error) {
    res.json("Erro ao buscar usuarios");
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const email = req.query.email;
  const { userName, password } = req.body;
  const verifyInvalidNewUser = [];

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

  if (password) {
    const lastPassword = await User.findOne({ password: password });
    if (lastPassword) {
      verifyInvalidNewUser.push(
        "Senha não pode ser igual a última cadastrada!"
      );
    }
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

    if (verifyInvalidNewUser.length > 0) {
      return res.json(verifyInvalidNewUser);
    }

    try {
      const user = {
        userName,
        password,
      };
      await User.updateOne({ email: email }, user);
      res.json(user);
    } catch (error) {
      res.json("Erro interno ao atualizar usuario!");
      console.log(error);
    }
  }
};

const deleteUser = async (req, res) => {
  try {
    const email = req.query.email;
    const existUser = await User.findOne({ email: email });
    if (!existUser) {
      return res.json("Usuario não existe!");
    }
    await User.deleteOne({ email: email });
    res.json("Usuario deletado!");
  } catch (error) {
    res.json("Erro interno ao deletar usuario!");
    console.log(error);
  }
};

module.exports = { createUser, readUser, updateUser, deleteUser };
