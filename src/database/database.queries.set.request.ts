import { Observable } from "rxjs";
import { FriendRequest } from "../schemas/cred.user.js";
import { Request } from "express";
import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const setPendingRequest = (req: Request): Promise<boolean> => {
  const userRequest = req.body as FriendRequest;
  return new Promise((resolve, reject) => {
    const client = new MongoClient(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    } as MongoClientOptions);
    client.connect(async (err) => {
      if (err) reject(err.name + " " + err.message);
      const collection = client
        .db(process.env.DB_REGISTER)
        .collection(process.env.DB_COLLECTION_REGISTERED);

      const { userid } = userRequest.from;
      delete userRequest.token;
      delete userRequest.from;
      await collection
        .updateOne(
          { "user.userid": userid },
          { $push: { "user.pendingRequest": userRequest } }
        )
        .then((updateResponse) => {
          if (updateResponse.acknowledged.valueOf()) resolve(true);
        })
        .catch((err) => {
          reject(err.message + " " + err.name);
        })
        .finally(() => {
          client.close();
        });
    });
  });
};

export default setPendingRequest;
