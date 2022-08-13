import { Observable } from "rxjs";
import { Request } from "express";
import removeUserRequest from "./database.queries.remove.request.user.js";
import mongoClient from "../services/client.service.js";

const sendResponse = (req: Request): Observable<boolean> => {
  const { id, emitterId } = req.body;
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
            { "user.userid": emitterId },
            { $pull: { "user.friendRequest.?.from": id } }
          )
          .then((updateResponse) => {
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
