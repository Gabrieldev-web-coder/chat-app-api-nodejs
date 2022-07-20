import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Observable } from "rxjs";
import { registerNewUser } from "../schemas/cred.user.js";
import { generateToken } from "../jwt.auth/jwt.js";

dotenv.config();

const registerUser = (user: registerNewUser) => {
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

      let checkingUser;
      await collection
        .findOne({ user })
        .then((value) => (checkingUser = value));
      console.log(checkingUser);
      if (!checkingUser) {
        let token: string | null = null;
        let jwtErr: string = "";
        generateToken(JSON.stringify(user)).subscribe({
          next: (value) => (token = value),
          error: (err) => (jwtErr = err),
        });
        await collection
          .insertOne({ user })
          .catch((err) => {
            suscriber.error(err);
          })
          .then((value) => {
            if (!jwtErr) {
              suscriber.next({ saveResult: value, token: token });
            } else {
              suscriber.error("Error generating token: " + jwtErr);
            }
          });
        await client.close().finally(() => {
          suscriber.complete();
        });
      } else {
        suscriber.error("This user already exist, consider login.");
      }
    });
  });
};

export { registerUser };
