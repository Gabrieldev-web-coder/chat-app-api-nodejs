import dotenv from "dotenv";
import { Request } from "express";
import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
import { Observable } from "rxjs";
import { decode, JwtPayload } from "jsonwebtoken";
import { optionalFields } from "../schemas/cred.user.js";

dotenv.config();

const updateUser = async (keys: string[], req: Request) => {
  const userBody = decode(req.body.token, { complete: true });
  const payload = userBody.payload as JwtPayload;
  const { userid } = JSON.parse(payload.body);

  const selectFields = await import("../middlewares/fields.selection.js").then(
    (select) => select.default(keys, req)
  );

  console.log(Object.keys(selectFields))

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
        .findOneAndUpdate(
          { "user.userid": userid },
          {
            $set:{selectFields},
          }
        )
        .then((modify) => suscriber.next(modify))
        .catch((err) => suscriber.error(err));
      await client.close().finally(() => {
        suscriber.complete();
      });
    });
  });
};

export default updateUser;
