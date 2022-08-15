import { Request } from "express";
import { optionalFields } from "../schemas/cred.user.js";
import moment from "moment";

const selectFields = (keys: string[], req: Request): optionalFields => {
  delete req.body.token;
  const fields: optionalFields = {};
  type objectKey = keyof typeof fields;
  for (let i = 0; i < keys.length; i++) {
    if (req.body[keys[i]]) fields[keys[i] as objectKey] = req.body[keys[i]];
  }
  const entries = Object.keys(fields);
  const prefixAdded = entries.map((field) => "user." + field);
  const entriesValues = Object.values(fields);
  const query: any = {};
  for (let i = 0; i < entries.length; i++)
    query[prefixAdded[i]] = entriesValues[i];
  query["user.lastMoficationAt"] = `${moment().format("LLLL")}`;
  return query;
};

export default selectFields;
