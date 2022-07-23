import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
import { Request } from "express";
import { Observable } from "rxjs";
import dotenv from "dotenv";

dotenv.config();

const checkUser = (req: Request): Observable<any> => {
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
      const fieldSelected = Object.keys(req.body)[0];
      const value = req.body[fieldSelected]
      if (fieldSelected === "username") {
        collection
          .find()
          .filter({"user.username":value})
          .toArray((err, docs) => {
            if (err) suscriber.error(err);
            const userpwd = docs[0].user.pwd
          });
        //.filter({
        //  $and: [{ querySearch }, { queryPwd }],
        //})
      }else{
        collection
          .find()
          .filter({"user.email":value})
          .toArray((err, docs) => {
            if (err) suscriber.error(err);
            const userpwd = docs[0].user.pwd
          });
      }
    });
  });
};

export default checkUser;
