import bcrypt from "bcryptjs";
const saltRound = 15;

export const hashPassword = (plainPass) => {
  return bcrypt.hashSync(plainPass, saltRound);
};

export const comparePassword = (plainPass, hashPassword) => {
  return bcrypt.compareSync(plainPass, hashPassword);
};
