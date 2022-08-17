import { Observable } from "rxjs";
import { Request } from "express";
import removeUserRequest from "./database.queries.remove.request.user.js";
import mongoClient from "../services/client.service.js";
import dotenv from "dotenv";

dotenv.config();

const sendResponse = (req: Request): Observable<any> => {
  const { id, emitterId, accepted } = req.body;
  return new Observable((suscriber) => {
    const client = mongoClient;
    client.connect(async (err) => {
      if (err) suscriber.error(err.name + " " + err.message);
      const collection = client
        .db(process.env.DB_REGISTER)
        .collection(process.env.DB_COLLECTION_REGISTERED);

      const removedFromPending = await removeUserRequest(req).then(
        (updated) => updated
      );
      if (removedFromPending) {
        await collection
          .updateOne(
            {
              $and: [
                { "user.pendingRequest": { $elemMatch: { to: emitterId } } },
                { "user.userid": id },
              ],
            },
            { $set: { "user.pendingRequest.$.accepted": accepted } }
          )
          .then((updateResponse) => {
            console.log(updateResponse);
            if (updateResponse.acknowledged.valueOf()) suscriber.next(true);
          })
          .catch((err) => {
            suscriber.error(err.message + " " + err.name);
          })
          .finally(() => {
            client.close().finally(() => {
              suscriber.complete();
            });
          });
      }
    });
  });
};

export default sendResponse;
