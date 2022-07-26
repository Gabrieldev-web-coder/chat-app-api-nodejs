import dotenv from "dotenv";
import { Request } from "express";
import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
import { Observable } from "rxjs";

dotenv.config();

const updateUser = async (keys: string[], req: Request) => {
  const selectFields = await import("../middlewares/fields.selection.js").then(
    (select) => select.default(keys, req)
  );
  return new Observable((suscriber) => {
    const client = new MongoClient(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    } as MongoClientOptions);

    client.connect(async (err) => {
      if (err) suscriber.error(err);
      const collection = client
        .db(process.env.DB_REGISTER)
        .collection(process.env.DB_COLLECTION_REGISTERED);
      await collection
        .findOneAndUpdate({}, {}) //Quering and update doc of user
        .then((modify) => suscriber.next(modify))
        .catch((err) => suscriber.error(err));
      await client.close().finally(() => {
        suscriber.complete();
      });
    });
  });
};

export default updateUser;
