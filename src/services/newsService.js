import News from "../models/News.js";

export const newsUpdateService = (id, title, description, banner) =>
  News.findOneAndUpdate(
    { _id: id },
    { title, description, banner },
    { rawResult: true }
  );
