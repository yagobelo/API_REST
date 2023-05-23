import News from "../models/News.js";

const createNews = async (req, res) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);

    if (!authorization) {
      return res.send(401);
    }

    const parts = authorization.split(" ");
    const [schema, token] = parts;

    if (parts.length !== 2) {
      res.send(401);
    }

    if (schema !== "Bearer") {
      return res.send(401);
    }

    const { title, description, banner } = req.body;
    const newNews = {
      title,
      description,
      banner,
      user: { _id: "64658447087ef40c4dbf5153" },
    };
    await News.create(newNews);
    const newsCreated = {
      Titulo: newNews.title,
      Descrição: newNews.description,
    };

    res.status(201).json("Nova notícia criada!");
  } catch (error) {
    res.status(401).json({ message: "Erro interno ao criar nova notícia!" });
    console.log(error);
  }
};

const findAllNews = async (req, res) => {
  try {
    const news = await News.find();
    if (!news) {
      return res.status(400).json({ message: "Nenhuma noticia encontrada!" });
    }
    res.status(200).json({ message: "Todas as notícias: ", news });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Erro interno ao buscar todas as notícias!" });
    console.log(error);
  }
};

export default { createNews, findAllNews };
