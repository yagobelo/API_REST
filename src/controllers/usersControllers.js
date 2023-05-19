import User from "../models/User.js";

const createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const newUser = {
      userName,
      email,
      password,
    };
    await User.create(newUser);
    const userCreated = { UserName: newUser.userName, Email: newUser.email };
    res
      .status(201)
      .json({ message: "Novo usuario criado com sucesso!", userCreated });
  } catch (error) {
    res.status(400).json("Erro interno ao criar novo usuario");
    console.log(error);
  }
};

const findAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) {
      return res.status(404).json({ message: "Nenhum usuario encontrado!" });
    }
    res.status(200).json({ message: "Lista de todos os usuarios:", allUsers });
  } catch (error) {
    res.status(404).json({ message: "Erro ao buscar usuarios" });
    console.log(error);
  }
};

const findUserById = async (req, res) => {
  try {
    const userFindById = await User.findOne({ _id: req.params.id });
    res.status(200).json(userFindById);
  } catch (error) {
    res.status(404).json({ message: "Erro ao buscar usuarios" });
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { userName, password } = req.body;
    const user = {
      userName,
      password,
    };
    await User.updateOne({ _id: id }, user);
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

export default {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
};
