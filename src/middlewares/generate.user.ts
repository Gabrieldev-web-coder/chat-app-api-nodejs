import bcrypt from "bcrypt";
import { registerNewUser } from "../schemas/cred.user.js";
import { setDefault } from "./set.default.js";
import { Request } from "express";

const generateUser = async (req: Request): Promise<registerNewUser> => {
  const user = await setDefault(req);
  let { pwd } = user;
  return await new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) reject(err.name + " " + err.message);
      bcrypt.hash(pwd, salt, (err, hashed) => {
        if (err) reject(err.name + " " + err.message);
        pwd = hashed;
        resolve(user);
      });
    });
  });
};

export { generateUser };
