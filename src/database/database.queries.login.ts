import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
import { Request } from "express";
import { Observable } from "rxjs";
import dotenv from "dotenv";
import verifyPwd from "../middlewares/verify.password.js";
import { generateToken } from "../jwt.auth/jwt.js";
import { loginResponse } from "../schemas/cred.user.js";

dotenv.config();

const checkUser = (req: Request): Observable<loginResponse> => {
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
          .toArray(async (err, users) => {
            if (err) suscriber.error(err);
            if (!users[0])
              suscriber.error("This user don't exist, consider register");
            const hashedPwd: string = users[0].user.pwd;
            await verifyPwd(plainpwd, hashedPwd).then((value) => {
              if (value) {
                delete users[0].user.pwd;
                const body = JSON.stringify(users[0].user);
                let tokenResponse: string = "";
                generateToken(body).subscribe({
                  next: (token) => (tokenResponse = token),
                });
                const response: loginResponse = users[0].user;
                response.token = tokenResponse;
                suscriber.next(response);
                suscriber.complete();
              } else {
                suscriber.error("Incorrect password.");
                suscriber.complete();
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
          .toArray(async (err, users) => {
            if (err) suscriber.error(err);
            const hashedPwd: string = users[0].user.pwd;
            await verifyPwd(plainpwd, hashedPwd).then((value) => {
              if (value) {
                delete users[0].user.pwd;
                const body = JSON.stringify(users[0].user);
                let tokenResponse: string = "";
                generateToken(body).subscribe({
                  next: (token) => (tokenResponse = token),
                });
                const response: loginResponse = users[0].user;
                response.token = tokenResponse;
                suscriber.next(response);
                suscriber.complete();
              } else {
                suscriber.error("Incorrect password.");
                suscriber.complete();
              }
            });
          });
      }
    });
  });
};

export default checkUser;
