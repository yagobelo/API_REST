import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

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

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.sendStatus(401);
      }
      const user = await User.findOne({ _id: decoded.id });

      if (!user || !user.id) {
        return res.status(401).json({ message: "Token invalido!" });
      }

      req.userId = user.id;

      return next();
    });
  } catch (error) {
    res.status(500).json(message("Erro interno ao validar token de login"));
    console.log(error);
  }
};
