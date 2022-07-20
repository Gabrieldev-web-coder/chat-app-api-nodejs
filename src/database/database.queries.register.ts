import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Observable } from "rxjs";

dotenv.config();

const registerUser = (user:RegisterNewUser) => {
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
      collection.insertOne({

      });
      await client.close().finally(() => {
        suscriber.complete();
      });
    });
  });
};

export { registerUser };
