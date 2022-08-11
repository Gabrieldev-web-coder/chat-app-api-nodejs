import mongoClient from "../services/client.service.js";
import { Observable } from "rxjs";
import { registerNewUser } from "../schemas/cred.user.js";
import { generateToken } from "../jwt.auth/jwt.js";

const registerUser = (user: registerNewUser) => {
  return new Observable((suscriber) => {
    const client = mongoClient;
    client.connect(async (err) => {
      if (err) suscriber.error(err.name + " " + err.message);
      const collection = client
        .db(process.env.DB_REGISTER)
        .collection(process.env.DB_COLLECTION_REGISTERED);

      const { email, username } = user;
      collection
        .find()
        .filter({
          $or: [{ "user.email": email }, { "user.username": username }],
        })
        .toArray(async (err, docs) => {
          if (err) suscriber.error(err.message);
          if (docs.length === 0) {
            let token: string | null = null;
            let jwtErr: string = "";
            generateToken(JSON.stringify(user)).subscribe({
              next: (value: string) => (token = value),
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
            await client.close().finally(() => {
              suscriber.error("Your username or email is already taken.");
              suscriber.complete();
            });
          }
        });
    });
  });
};

export { registerUser };
