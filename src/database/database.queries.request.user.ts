import { Observable } from "rxjs";
import { FriendRequest } from "../schemas/cred.user.js";
import { Request } from "express";
import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
import setPendingRequest from "./database.queries.set.request.js";
import dotenv from "dotenv";

dotenv.config();

const sendRequest = (req: Request): Observable<boolean> => {
  const userRequest = req.body as FriendRequest;
  return new Observable((suscriber) => {
    const client = new MongoClient(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    } as MongoClientOptions);
    client.connect(async (err) => {

      await setPendingRequest(req)

      if (err) suscriber.error(err.name + " " + err.message);
      const collection = client
        .db(process.env.DB_REGISTER)
        .collection(process.env.DB_COLLECTION_REGISTERED);

      const userid = userRequest.to;
      await collection
        .updateOne(
          { "user.userid": userid },
          { $push: { "user.friendRequest": userRequest } }
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
    });
  });
};

export default sendRequest;
