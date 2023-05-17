const User = require("../models/User");

const createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const newUser = {
      userName,
      email,
      password,
    };
    User.create(newUser);
    res
      .status(201)
      .json({ message: "Novo usuario criado com sucesso!", newUser });
  } catch (error) {
    res.status(400).json("Erro interno ao criar novo usuario");
    console.log(error);
  }
};

const readUser = async (req, res) => {
  const userName = req.query.userName;
  try {
    if (!userName) {
      const allUsers = await User.find();
      if (!allUsers) {
        return res.status(404).json({ message: "Nenhum usuario encontrado!" });
      }
      res.status(200).json({ message: "Lista todos os usuarios:", allUsers });
    } else {
      const userByUsername = await User.findOne({ userName: userName });
      if (!userByUsername) {
        return res.json({ message: "Usuario não encontrado!" });
      }
      res.status(200).json(userByUsername);
    }
  } catch (error) {
    res.status(404).json({ message: "Erro ao buscar usuarios" });
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const email = req.query.email;
  const { userName, password } = req.body;
  try {
    const user = {
      userName,
      password,
    };
    await User.updateOne({ email: email }, user);
    res.status(200).json({ message: "Alterações feitas:", user });
  } catch (error) {
    res.status(400).json({ message: "Erro interno ao atualizar usuario!" });
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const email = req.query.email;
    const existUser = await User.findOne({ email: email });
    if (!existUser) {
      return res.status(404).json({ message: "Usuario não existe!" });
    }
    await User.deleteOne({ email: email });
    res.status(200).json({ message: "Usuario deletado!" });
  } catch (error) {
    res.status(400).json({ message: "Erro interno ao deletar usuario!" });
    console.log(error);
  }
};

module.exports = { createUser, readUser, updateUser, deleteUser };
