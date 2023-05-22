import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  banner: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  likes: {
    type: Array,
    require: true,
  },
  comments: {
    type: Array,
    require: true,
  },
});

const News = mongoose.model("News", newsSchema);

export default News;
