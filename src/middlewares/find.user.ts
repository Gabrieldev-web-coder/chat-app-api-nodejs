import { Observable } from "rxjs";
import { Request } from "express";
import {
  Document,
  MongoClient,
  MongoClientOptions,
  ServerApiVersion,
  WithId,
} from "mongodb";

import dotenv from "dotenv";

dotenv.config();

const findUserById = (req: Request): Observable<WithId<Document>> => {
  const userId = req.query.id;
  return new Observable((suscriber) => {
    const client = new MongoClient(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    } as MongoClientOptions);
    client.connect(async (err) => {
      if (err) suscriber.error(err.name + " " + err.message);
      const collection = client
        .db(process.env.DB_REGISTER)
        .collection(process.env.DB_COLLECTION_REGISTERED);
      await collection
        .findOne({ "user.userid": userId })
        .then((user) => {
          if (!user) {
            suscriber.error("This user don't exist.");
          }
          delete user.pwd;
          suscriber.next(user);
        })
        .catch((err) => {
          suscriber.error(err.message);
        });
    });
  });
};

export default findUserById;
