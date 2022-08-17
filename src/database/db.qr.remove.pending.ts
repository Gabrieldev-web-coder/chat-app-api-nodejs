import { Observable } from "rxjs";
import { Request } from "express";
import mongoClient from "../services/client.service.js";
import dotenv from "dotenv";

dotenv.config();

const removePendingUser = (
  req: Request,
  type: string
): Observable<Boolean | string> => {
  return new Observable((suscriber) => {
    const client = mongoClient;
    const { id, emitterId, accepted } = req.body;
    client.connect(async (err) => {
      if (err) suscriber.error(err.name + " " + err.message);
      const collection = client
        .db(process.env.DB_REGISTER)
        .collection(process.env.DB_COLLECTION_REGISTERED as string);
      if (type === "Friend request") {
        await collection
          .updateOne(
            {
              $and: [
                { "user.userid": emitterId },
                { "user.friendRequest": { $elemMatch: { from: id } } },
              ],
            },
            {
              $unset: { "user.friendRequest": { $elemMatch: { from: id } } },
            }
          )
          .then((update) => {
            update.modifiedCount > 0
              ? suscriber.next(true)
              : suscriber.next(false);
          })
          .catch((err) => {
            suscriber.error(err.message);
          });
      } else if (type === "Pending request") {
        await collection
          .updateOne(
            {
              $and: [
                { "user.userid": emitterId },
                { "user.pendingRequest": { $elemMatch: { from: id } } },
              ],
            },
            {
              $unset: {
                "user.pendingRequest": { $elemMatch: { from: id } },
              },
            }
          )
          .then((update) => {
            update.modifiedCount > 0
              ? suscriber.next(true)
              : suscriber.next(false);
          })
          .catch((err) => {
            suscriber.error(err.message);
          });
      } else {
        suscriber.error(`${type} type dont exist in this protocol.`);
      }
    });
  });
};

export default removePendingUser;
