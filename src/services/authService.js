import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginService = (email) =>
  User.findOne({ email: email }).select("+password");

export const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.SECRET_JWT, {
    expiresIn: 43200,
  });
