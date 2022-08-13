var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoClient from "../services/client.service.js";
import { Observable } from "rxjs";
import { generateToken } from "../jwt.auth/jwt.js";
import dotenv from "dotenv";
dotenv.config();
const registerUser = (user) => {
    return new Observable((suscriber) => {
        const client = mongoClient;
        client.connect((err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                suscriber.error(err.name + " " + err.message);
            const collection = client
                .db(process.env.DB_REGISTER)
                .collection(process.env.DB_COLLECTION_REGISTERED);
            const { email, username } = user;
            collection
                .find()
                .filter({
                $or: [{ "user.email": email }, { "user.username": username }],
            })
                .toArray((err, docs) => __awaiter(void 0, void 0, void 0, function* () {
                if (err)
                    suscriber.error(err.message);
                if (docs.length === 0) {
                    let token = null;
                    let jwtErr = "";
                    generateToken(JSON.stringify(user)).subscribe({
                        next: (value) => (token = value),
                    });
                    yield collection
                        .insertOne({ user })
                        .catch((err) => {
                        suscriber.error(err);
                    })
                        .then((value) => {
                        if (!jwtErr) {
                            suscriber.next({ saveResult: value, token: token });
                        }
                        else {
                            suscriber.error("Error generating token: " + jwtErr);
                        }
                    });
                    yield client.close().finally(() => {
                        suscriber.complete();
                    });
                }
                else {
                    yield client.close().finally(() => {
                        suscriber.error("Your username or email is already taken.");
                        suscriber.complete();
                    });
                }
            }));
        }));
    });
};
export { registerUser };
//# sourceMappingURL=database.queries.register.js.map