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
import { Observable } from "rxjs";
import dotenv from "dotenv";
dotenv.config();
const checkUserApi = (userCredentials) => {
    return new Observable((suscriber) => {
        const client = new MongoClient(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });
        client.connect((err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                suscriber.error(err + " " + err.message);
            const collection = client
                .db(process.env.DB_API)
                .collection(process.env.DB_COLLECTION_API);
            yield collection
                .findOne({
                $and: [
                    { username: userCredentials.username, pwd: userCredentials.pwd },
                ],
            })
                .catch((err) => suscriber.error(err))
                .then((value) => suscriber.next(value))
                .finally(() => {
                client.close().finally(() => {
                    suscriber.complete();
                });
            });
        }));
    });
};
const checkUser = (userCredentials) => {
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
                .db(process.env.DB_API)
                .collection(process.env.DB_COLLECTION_API);
            yield collection
                .findOne({
                username: userCredentials.username,
                pwd: userCredentials.pwd,
            })
                .catch((err) => suscriber.error(err))
                .then((value) => suscriber.next(value))
                .finally(() => {
                client.close().finally(() => {
                    suscriber.complete();
                });
            });
        }));
    });
};
const saveDataUser = (userInfo) => {
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
                .db(process.env.DB_API)
                .collection(process.env.DB_COLLECTION_API);
            let user;
            // await generateUser(userInfo)
            //   .then((value) => (user = value))
            //   .catch((err) => suscriber.error(err));
            yield collection
                .insertOne({ user })
                .catch((err) => suscriber.error(err))
                .then((value) => suscriber.next(value))
                .finally(() => {
                client.close().finally(() => {
                    suscriber.complete();
                });
            });
        }));
    });
};
const saveDataApiUser = (userInfo) => {
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
                .db(process.env.DB_API)
                .collection(process.env.DB_COLLECTION_API);
            let user;
            // await generateUser(userInfo)
            //   .then((value) => (user = value))
            //   .catch((err) => suscriber.error(err));
            yield collection
                .insertOne({ user })
                .catch((err) => suscriber.error(err))
                .then((value) => suscriber.next(value))
                .finally(() => {
                client.close().finally(() => {
                    suscriber.complete();
                });
            });
        }));
    });
};
export { checkUserApi, checkUser, saveDataApiUser };
//# sourceMappingURL=database.queries.api.js.map