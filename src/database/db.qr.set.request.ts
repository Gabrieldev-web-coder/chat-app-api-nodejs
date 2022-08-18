import { FriendRequest } from "../schemas/cred.user.js";
import { PendingRequest } from "../schemas/cred.user.js";
import { Request } from "express";
import mongoClient from "../services/client.service.js";
import dotenv from "dotenv";

dotenv.config();

const setPendingRequest = (req: Request): Promise<boolean> => {
  const userRequest = req.body as FriendRequest;
  const { to, accepted, from } = userRequest;
  const userInfo: PendingRequest = {
    to: to,
    accepted: accepted,
  };
  return new Promise((resolve, reject) => {
    const client = mongoClient;
    client.connect(async (err) => {
      if (err) reject(err.name + " " + err.message);
      const collection = client
        .db(process.env.DB_REGISTER)
        .collection(process.env.DB_COLLECTION_REGISTERED);

      const requestExist = await collection
        .find()
        .filter({
          $and: [
            { "user.userid": from },
            {
              "user.pendingRequest": {
                $elemMatch: { to: to, accepted: accepted },
              },
            },
          ],
        })
        .toArray();
      if (requestExist.length > 0) {
        resolve(false);
      } else {
        await collection
          .updateOne(
            { "user.userid": from },
            { $push: { "user.pendingRequest": userInfo } }
          )
          .then((updateResponse) => {
            updateResponse.modifiedCount > 0 ? resolve(true) : resolve(false);
          })
          .catch((err) => {
            reject(err.message + " " + err.name);
          });
      }
    });
  });
};

export default setPendingRequest;
