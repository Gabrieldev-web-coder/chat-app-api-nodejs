import { Request } from "express";
import { Observable } from "rxjs";
import mongoClient from "../services/client.service.js";
import dotenv from "dotenv";

dotenv.config();

const updateUser = async (
  keys: string[],
  req: Request
): Promise<Observable<boolean>> => {
  const userid = await import("../middlewares/get.user.id.js").then((idFound) =>
    idFound.default(req)
  );

  const selectFields = await import("../middlewares/fields.selection.js").then(
    (select) => select.default(keys, req)
  );

  return new Observable((suscriber) => {
    const client = mongoClient;
    client.connect(async (err) => {
      if (err) suscriber.error(err.name + " " + err.message);
      const collection = client
        .db(process.env.DB_REGISTER)
        .collection(process.env.DB_COLLECTION_REGISTERED);
      await collection
        .updateOne(
          { "user.userid": userid },
          {
            $set: selectFields,
          }
        )
        .then((modify) => suscriber.next(modify.acknowledged))
        .catch((err) => suscriber.error(err.name + " " + err.message));
      await client.close().finally(() => {
        suscriber.complete();
      });
    });
  });
};

export default updateUser;
