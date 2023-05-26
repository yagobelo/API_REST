import News from "../models/News.js";

const createNews = async (req, res) => {
  try {
    const { title, description, banner } = req.body;
    const newNews = {
      title,
      description,
      banner,
      user: req.userId,
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
    let { limit, offset } = req.query;
    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }
    if (!offset) {
      offset = 0;
    }

    const news = await News.find()
      .sort({ _id: -1 })
      .skip(offset)
      .limit(limit)
      .populate("user");

    const totalCountNews = await News.countDocuments();
    const currentyUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < totalCountNews
        ? `${currentyUrl}?limit=${limit}&offset=${next}`
        : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentyUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (!news) {
      return res.status(400).json({ message: "Nenhuma noticia encontrada!" });
    }
    res.status(200).send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      totalCountNews,
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        userName: item.user.userName,
      })),
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Erro interno ao buscar todas as notícias!" });
    console.log(error);
  }
};

export default { createNews, findAllNews };
