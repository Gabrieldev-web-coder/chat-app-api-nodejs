import mongoClient from "../services/client.service.js";
import { Request } from "express";
import dotenv from "dotenv";

dotenv.config();

const removeUserRequest = (req: Request): Promise<any> => {
  return new Promise((resolve, reject) => {
    const client = mongoClient;
    const { id, emitterId, accepted } = req.body;
    client.connect(async (err) => {
      if (err) reject(err.name + " " + err.message);
      const collection = client;
      await collection
        .db(process.env.DB_REGISTER)
        .collection(process.env.DB_COLLECTION_REGISTERED as string)
        .updateOne(
          { "user.userid": id, "user.friendRequest.$.from": id },
          { $set: { "user.friendRequest.$.accepted": accepted } }
        )
        .then(async (update) => {
          resolve(update);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  });
};

export default removeUserRequest;
