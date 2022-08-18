import mongoClient from "../services/client.service.js";
import { Observable } from "rxjs";
import { FriendRequest } from "../schemas/cred.user.js";
import { Request } from "express";
import setPendingRequest from "./db.qr.set.request.js";
import dotenv from "dotenv";

dotenv.config();

const sendRequest = (req: Request): Observable<boolean> => {
  const userRequest = req.body as FriendRequest;
  return new Observable((suscriber) => {
    const client = mongoClient;
    client.connect(async (err) => {
      if (err) suscriber.error(err.name + " " + err.message);

      const settendPending = await setPendingRequest(req).then((bool) => bool);
      const collection = client
        .db(process.env.DB_REGISTER)
        .collection(process.env.DB_COLLECTION_REGISTERED);
      const userid = userRequest.to;
      if (settendPending) {
        delete userRequest.token;
        delete userRequest.to;
        await collection
          .updateOne(
            { "user.userid": userid },
            { $push: { "user.friendRequest": userRequest } }
          )
          .then((updateResponse) => {
            updateResponse.modifiedCount > 0
              ? suscriber.next(true)
              : suscriber.next(false);
          })
          .catch((err) => {
            suscriber.error(err.message + " " + err.name);
          })
          .finally(async () => {
            await client.close().finally(() => {
              suscriber.complete();
            });
          });
      }
    });
  });
};

export default sendRequest;
