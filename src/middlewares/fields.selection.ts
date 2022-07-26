import { Request } from "express";
import { optionalFields } from "../schemas/cred.user.js";

const selectFields = (keys: string[], req: Request): optionalFields => {
  const fields: optionalFields = {};
  type objectKey = keyof typeof fields;

  for (let i = 0; i < keys.length; i++) fields[keys[i] as objectKey] = req.body[keys[i]];
  delete fields?.token
  return fields;
};

export default selectFields;
