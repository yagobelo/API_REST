import User from "../models/User.js";

export const validPassword = async (password, verifyInvalidNewUser) => {
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

export const validCreateNewUser = async (req, res, next) => {
  try {
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
    if (password) {
      validPassword(password, verifyInvalidNewUser);
    }

    if (verifyInvalidNewUser.length > 0) {
      return res.json({ message: verifyInvalidNewUser });
    }
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "erro na validação de criação de usuario!" });
    console.log(err);
  }
};

export const validUpdateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const existUser = await User.findOne({ _id: id });

    if (!id) {
      return res.status(400).json({ message: "ID do usuario invalido!" });
    } else {
      if (!existUser) {
        return res.status(404).json({
          message: "Não existe nenhum usuario cadastrado com este email!",
        });
      }
    }

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
    if (password) {
      validPassword(password, verifyInvalidNewUser);
      if (existUser.password == password) {
        verifyInvalidNewUser.push("A senha não pode ser igual a anterior!");
      }
    }

    if (verifyInvalidNewUser.length > 0) {
      return res.json({ message: verifyInvalidNewUser });
    }
    next();
  } catch (err) {
    res.status(500).json({
      message: "erro na validação de atualização de dados de usuario!",
    });
    console.log(err);
  }
};

export const validCreateNews = (req, res, next) => {
  const { title, description, banner } = req.body;
  const verifyInvalidNewNews = [];

  if (!title) {
    verifyInvalidNewNews.push("Titulo é obrigatório!");
  }
  if (title.length < 4) {
    verifyInvalidNewNews.push(
      "Tamanho do titulo deve ter no minimo 4 caracteres!"
    );
  }

  if (!description) {
    verifyInvalidNewNews.push("Descrição é obrigatório!");
  }

  if (!banner) {
    verifyInvalidNewNews.push("Banner é obrigatório!");
  }

  if (verifyInvalidNewNews.length > 0) {
    return res.status(400).json(verifyInvalidNewNews);
  }
  next();
};
