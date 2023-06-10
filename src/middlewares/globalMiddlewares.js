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
    const { name, userName, email, password, avatar, background } = req.body;

    const verifyInvalidNewUser = [];

    if (!name) {
      verifyInvalidNewUser.push("Nome de usuario obrigatório!");
    }
    if (!userName) {
      verifyInvalidNewUser.push("Username de usuario obrigatório!");
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
    if (!avatar) {
      verifyInvalidNewUser.push("Imagem de avatar é obrigatório!");
    }
    if (!background) {
      verifyInvalidNewUser.push("Imagem de background é obrigatório!");
    }

    if (verifyInvalidNewUser.length > 0) {
      return res.send({ message: verifyInvalidNewUser });
    }
    next();
  } catch (err) {
    res
      .status(500)
      .send({ message: "erro na validação de criação de usuario!" });
    console.log(err);
  }
};

export const validUpdateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const existUser = await User.findOne({ _id: id });

    if (!id) {
      return res.status(400).send({ message: "ID do usuario invalido!" });
    } else {
      if (!existUser) {
        return res.status(404).send({
          message: "Não existe nenhum usuario cadastrado com este email!",
        });
      }
    }

    const { name, userName, password, avatar, background } = req.body;

    const verifyInvalidNewUser = [];

    if (!name && !userName && !password && !avatar && background) {
      verifyInvalidNewUser.push("Digite um campo para fazer alteração!");
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
      return res.send({ message: verifyInvalidNewUser });
    }
    next();
  } catch (err) {
    res.status(500).send({
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
    return res.status(400).send(verifyInvalidNewNews);
  }
  next();
};
