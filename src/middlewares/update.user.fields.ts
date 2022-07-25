import { Request } from "express";
import updateUser from "../database/database.queries.update.js";

const updateUserFields = (req: Request) => {
  return new Promise(async (resolve, reject) => {
    const fieldsSelected = Object.entries(req.body);
    console.log(fieldsSelected)
    await updateUser(fieldsSelected).then((ObserverResult) => {
      ObserverResult.subscribe({
        next: (modify) => resolve(modify),
        error: (err) => reject(err),
      });
    });
  });
};

export default updateUserFields;
