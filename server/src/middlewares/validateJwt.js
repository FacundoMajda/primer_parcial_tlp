import { getUserById } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const validateJwt = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Session is required" });
  }
  try {
    const { userId } = jwt.verify(token, "secret");
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid session" });
  }
};
