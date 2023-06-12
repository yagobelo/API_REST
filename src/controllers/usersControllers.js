import {
  createUserService,
  findAllUsersService,
  findUserByIdService,
  updateUserService,
} from "../services/userService.js";

export const createUser = async (req, res) => {
  try {
    const newUser = await createUserService(req.body);
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
    const allUsers = await findAllUsersService();
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
    const id = req.params.id;
    const userFindById = await findUserByIdService(id);
    res.status(200).send(userFindById);
  } catch (error) {
    res.status(404).send({ message: "Erro ao buscar usuarios" });
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    await updateUserService(id, req.body);

    res.status(200).send({ message: "Alterações feitas com sucesso!" });
  } catch (error) {
    res.status(400).send({ message: "Erro interno ao atualizar usuario!" });
    console.log(error);
  }
};
