import { Request } from "express";
import updateUser from "../database/database.queries.update.js";

const updateUserFields = (req: Request) => {
  return new Promise(async (resolve, reject) => {
    const fieldsSelected = Object.keys(req.body);
    await updateUser(fieldsSelected,req).then((ObserverResult) => {
      ObserverResult.subscribe({
        next: (modify) => resolve(modify),
        error: (err) => reject(err),
      });
    });
  });
};

export default updateUserFields;
