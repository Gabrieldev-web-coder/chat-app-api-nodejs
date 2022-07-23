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
const checkUser = (req) => {
    return new Observable((suscriber) => {
        const client = new MongoClient(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });
        client.connect((err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                suscriber.error(err.message + " " + err.name);
            const collection = client
                .db(process.env.DB_REGISTER)
                .collection(process.env.DB_COLLECTION_REGISTERED);
            const fieldSelected = Object.keys(req.body)[0];
            const value = req.body[fieldSelected];
            if (fieldSelected === "username") {
                collection
                    .find()
                    .filter({ "user.username": value })
                    .toArray((err, docs) => {
                    if (err)
                        suscriber.error(err);
                    console.log(docs);
                    suscriber.next(docs);
                });
                //.filter({
                //  $and: [{ querySearch }, { queryPwd }],
                //})
            }
        }));
    });
};
export default checkUser;
//# sourceMappingURL=database.queries.login.js.map