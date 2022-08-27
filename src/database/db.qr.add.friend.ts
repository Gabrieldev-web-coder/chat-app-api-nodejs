import mongoClient from "../services/client.service.js";
import dotenv from "dotenv";
import { Observable } from "rxjs";
import { Request } from "express";

dotenv.config();

const addFriendList = (req: Request): Observable<boolean> => {
  return new Observable((suscriber) => {
    const client = mongoClient;
    const { id, emitterId } = req.body;
    client.connect(async (err) => {
      if (err) suscriber.error(err.name + " " + err.message);
      const collection = client;
      await collection
        .db(process.env.DB_REGISTER)
        .collection(process.env.DB_COLLECTION_REGISTERED as string)
        .updateOne(
          {
            $and: [
              { "user.userid": emitterId },
              { "user.friends": { $not: { $elemMatch: { friendId: id } } } },
            ],
          },
          { $push: { "user.friends": { friendId: id } } }
        )
        .then(async (update) => {
          suscriber.next(update.modifiedCount > 0);
        })
        .catch((err) => {
          suscriber.error(err.message);
        });
    });
  });
};

export default addFriendList;
