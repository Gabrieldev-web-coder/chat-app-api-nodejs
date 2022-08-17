import { Observable } from "rxjs";
import { Request } from "express";
import mongoClient from "../services/client.service.js";
import dotenv from "dotenv";

dotenv.config();

const removePending = (req: Request, type: string): Observable<Boolean> => {
  return new Observable((suscriber) => {
    const client = mongoClient;
    client.connect(async (err) => {
      if (err) suscriber.error(err.name + " " + err.message);
      const collection = client
        .db(process.env.DB_REGISTER)
        .collection(process.env.DB_COLLECTION_REGISTERED);
      //Some stuff...
    });
  });
};

export default removePending;
