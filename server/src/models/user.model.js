import bcrypt from "bcrypt";
import crypto from "crypto";

const usersCollection = [];

export const createUser = async (user) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  const newUser = {
    id: crypto.randomUUID().toString(),
    ...user,
    password: hashedPassword,
  };

  usersCollection.push(newUser);

  return newUser;
};

export const getUserById = async (id) => {
  const findedUser = usersCollection.find((user) => user.id === id) || null;
  return Promise.resolve(findedUser);
};

export const getUserByCredentials = async (email, password) => {
  const findedUser = usersCollection.find((user) => user.email === email);

  if (!findedUser) {
    return null;
  }

  const isPasswordMatch = await bcrypt.compare(password, findedUser.password);

  if (isPasswordMatch) {
    return findedUser;
  }

  return null;
};

export const getUserByEmail = (email) => {
  const findedUser = usersCollection.find((user) => user.email === email);
  return findedUser;
};
