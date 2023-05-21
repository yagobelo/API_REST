import User from "../models/User.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return res.status(404).json("Email ou senha incorretos!");
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(400).json({ message: "Email ou senha incorretos!" });
    }

    res.send("Login Ok");
  } catch (error) {
    res.status(500).json({ message: "Erro interno ao efetuar o login!" });
    console.log(error);
  }
};
