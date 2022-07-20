import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Observable } from "rxjs";
import { registerNewUser } from "../schemas/cred.user.js";

dotenv.config();

const registerUser = (user: registerNewUser) => {
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
        .insertOne({ user })
        .catch((err) => {
          suscriber.error(err);
        })
        .then((value) => {
          suscriber.next(value);
        });
      await client.close().finally(() => {
        suscriber.complete();
      });
    });
  });
};

export { registerUser };
