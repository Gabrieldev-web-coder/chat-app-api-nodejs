import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";

import { Observable } from "rxjs";
import dotenv from "dotenv";
import { cred } from "../schemas/cred.user.js";

dotenv.config();

const checkUser = (userCred: cred): Observable<any> => {
  return new Observable((suscriber) => {
    const client = new MongoClient(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    } as MongoClientOptions);

    client.connect(async (err) => {
      if (err) suscriber.error(err.message + " " + err.name);
      const collection = client
        .db(process.env.DB_REGISTER)
        .collection(process.env.DB_COLLECTION_REGISTERED);
      const { username, email, pwd } = userCred;
      
      collection.find().filter({
        $and:[
            {$or:[{}]}
        ]
      });
    });
  });
};
