import User from "../models/User.js";

export const createUserService = (body) => User.create(body);

export const findAllUsersService = () => User.find();

export const findUserByIdService = (id) => User.findOne({ _id: id });

export const updateUserService = (id, body) =>
  User.findOneAndUpdate({ _id: id }, body);
