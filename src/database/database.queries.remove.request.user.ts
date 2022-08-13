import mongoClient from "../services/client.service";
import { Request } from "express";
import dotenv from "dotenv";

dotenv.config();

const removeUserRequest = (req: Request): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const client = mongoClient;
    const { id, emitterId } = req.body;
    client.connect(async (err) => {
      if (err) reject(err.name + " " + err.message);
      const collection = client;
      await collection
        .db(process.env.DB_REGISTER)
        .collection(process.env.DB_COLLECTION_REGISTERED as string)
        .updateOne(
          { "user.userid": id },
          { $pull: { "user.friendRequest.?.to": emitterId } }
        )
        .then((update) => {
          update.acknowledged.valueOf() ? resolve(true) : resolve(false);
        })
        .catch((err) => {
          reject(err.message);
        })
        .finally(() => {
          client.close();
        });
    });
  });
};

export default removeUserRequest;
