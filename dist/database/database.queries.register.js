var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import { Observable } from "rxjs";
import { generateToken } from "../jwt.auth/jwt.js";
dotenv.config();
const registerUser = (user) => {
    return new Observable((suscriber) => {
        const client = new MongoClient(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });
        client.connect((err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                suscriber.error(err.name + " " + err.message);
            const collection = client
                .db(process.env.DB_REGISTER)
                .collection(process.env.DB_COLLECTION_REGISTERED);
            let checkingUser;
            let userid = user.userid;
            yield collection
                .findOne({ "user.userid": userid })
                .then((value) => (checkingUser = value));
            console.log(checkingUser);
            console.log(user);
            if (!checkingUser) {
                let token = null;
                let jwtErr = "";
                generateToken(JSON.stringify(user)).subscribe({
                    next: (value) => (token = value),
                    error: (err) => (jwtErr = err),
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
                suscriber.error("This user already exist, consider login.");
            }
        }));
    });
};
export { registerUser };
//# sourceMappingURL=database.queries.register.js.map