import createJWT from "../helpers/createJwt.js";
import {
  createUser,
  getUserByCredentials,
  getUserByEmail,
} from "../models/user.model.js";

export const signInCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });
    }
    const token = await createJWT(user.id);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ status: "success", data: user, token: token });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const signUpCtrl = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExist = getUserByEmail(email);
    if (userExist) {
      return res
        .status(400)
        .json({ status: "error", message: "User already exist" });
    }

    const user = await createUser({ username, email, password });

    return res.status(201).json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signOutCtrl = (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ status: "success", message: "Sign out success" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getMeCtrl = (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
