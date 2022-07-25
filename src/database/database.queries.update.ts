import dotenv from "dotenv";
import { Request } from "express";
import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
import { Observable } from "rxjs";

dotenv.config();

const updateUser = async (keys: string[], req: Request) => {
  return new Observable((suscriber) => {
    const client = new MongoClient(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    } as MongoClientOptions);

    //let doc: any = {};

    //for (let i = 0; i < keys.length; i++) doc[keys[i]] = req.body[keys[i]];

    //delete doc.token

    //Made all this in a single function apart...

    //console.log("Fields to editm and his values: ");
    //console.log(doc);
    //suscriber.next(doc);

    // client.connect(async (err) => {
    //   if (err) suscriber.error(err);
    //   const collection = client
    //     .db(process.env.DB_REGISTER)
    //     .collection(process.env.DB_COLLECTION_REGISTERED);
    //   await collection
    //     .findOneAndUpdate({}, {}) //Quering and update doc of user
    //     .then((modify) => suscriber.next(modify))
    //     .catch((err) => suscriber.error(err));
    //   await client.close().finally(() => {
    //     suscriber.complete();
    //   });
    // });
  });
};

export default updateUser;
