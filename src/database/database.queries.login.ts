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
        
    console.log(Object.keys(req.body))
      //collection.find().filter({
      //  $and: [{ $or: [{}] }],
      //});
    });
  });
};

export default checkUser
