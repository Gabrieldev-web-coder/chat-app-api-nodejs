import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
import { Request } from "express";
import { Observable } from "rxjs";
import dotenv from "dotenv";
import verifyPwd from "../middlewares/verify.password.js";
import { generateToken } from "../jwt.auth/jwt.js";

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
      const fieldSelected: string = Object.keys(req.body)[0];
      const value: string = req.body[fieldSelected];
      const plainpwd: string = req.body.pwd;
      if (fieldSelected === "username") {
        collection
          .find()
          .filter({ "user.username": value })
          .toArray(async (err, docs) => {
            if (err) suscriber.error(err);
            const hashedPwd: string = docs[0].user.pwd;
            await verifyPwd(plainpwd, hashedPwd).then((value) => {
              if (value) {
                delete docs[0].user.pwd;
                const body = JSON.stringify(docs[0].user);
                generateToken(body).subscribe({
                  next: (token) => suscriber.next(token),
                });
              } else {
                suscriber.error("Incorrect password.");
              }
            });
          });
        //.filter({
        //  $and: [{ querySearch }, { queryPwd }],
        //})
      } else {
        collection
          .find()
          .filter({ "user.email": value })
          .toArray(async (err, docs) => {
            if (err) suscriber.error(err);
            const hashedPwd: string = docs[0].user.pwd;
            await verifyPwd(plainpwd, hashedPwd).then((value) => {
              if (value) {
                delete docs[0].user.pwd;
                const body = JSON.stringify(docs[0].user);
                generateToken(body).subscribe({
                  next: (token) => suscriber.next(token),
                });
              } else {
                suscriber.error("Incorrect password.");
              }
            });
          });
      }
    });
  });
};

export default checkUser;
