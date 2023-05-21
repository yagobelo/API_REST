import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Waiting connection with MongoDB...");
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection with MongoDB: OK");
    })
    .catch((err) => {
      console.log("Error on connection with MongoDB: " + err);
    });
};

export default connectDatabase;
