import News from "../models/News.js";

export const newsUpdateService = (id, title, description, banner) =>
  News.findOneAndUpdate(
    { _id: id },
    { title, description, banner },
    { rawResult: true }
  );

export const deleteNewsService = (id) => News.findOneAndDelete({ _id: id });

export const likeNewsService = (id, userId) =>
  News.findOneAndUpdate(
    { _id: id, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  );

export const deleteLikeNewsService = (id, userId) =>
  News.findOneAndUpdate({ _id: id }, { $pull: { likes: { userId } } });

export const addCommentNewsService = (id, userId, comment) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36);

  return News.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        comments: { idComment, userId, comment, createdAt: new Date() },
      },
    }
  );
};

export const deleteCommentNewsService = (id, idComment, userId) =>
  News.findOneAndUpdate(
    { _id: id },
    { $pull: { comments: { idComment, userId } } }
  );
