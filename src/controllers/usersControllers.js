import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { name, userName, email, password, avatar, background } = req.body;
    const newUser = {
      name,
      userName,
      email,
      password,
      avatar,
      background,
    };
    await User.create(newUser);
    const userCreated = {
      Name: newUser.name,
      UserName: newUser.userName,
      Email: newUser.email,
    };
    res
      .status(201)
      .send({ message: "Novo usuario criado com sucesso!", userCreated });
  } catch (error) {
    res.status(400).send("Erro interno ao criar novo usuario");
    console.log(error);
  }
};

export const findAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) {
      return res.status(404).send({ message: "Nenhum usuario encontrado!" });
    }
    res.status(200).send({ message: "Lista de todos os usuarios:", allUsers });
  } catch (error) {
    res.status(404).send({ message: "Erro ao buscar usuarios" });
    console.log(error);
  }
};

export const findUserById = async (req, res) => {
  try {
    const userFindById = await User.findOne({ _id: req.params.id });
    res.status(200).send(userFindById);
  } catch (error) {
    res.status(404).send({ message: "Erro ao buscar usuarios" });
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, userName, password, avatar, background } = req.body;
    const user = {
      name,
      userName,
      password,
      avatar,
      background,
    };
    await User.findOneAndUpdate({ _id: id }, user);
    res.status(200).send({ message: "Alterações feitas:", user });
  } catch (error) {
    res.status(400).send({ message: "Erro interno ao atualizar usuario!" });
    console.log(error);
  }
};
