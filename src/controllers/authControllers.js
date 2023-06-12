import bcrypt from "bcrypt";
import { loginService, generateToken } from "../services/authService.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email);
    if (!user) {
      return res.status(404).send("Email ou senha incorretos!");
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(400).send({ message: "Email ou senha incorretos!" });
    }

    const token = generateToken(user.id);

    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: "Erro interno ao efetuar o login!" });
    console.log(error);
  }
};
