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
import verifyPwd from "../middlewares/verify.password.js";
import { generateToken } from "../jwt.auth/jwt.js";
import dotenv from "dotenv";
dotenv.config();
const checkUser = (req) => {
    return new Observable((suscriber) => {
        const client = mongoClient;
        client.connect((err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                suscriber.error(err.message + " " + err.name);
            const collection = client
                .db(process.env.DB_REGISTER)
                .collection(process.env.DB_COLLECTION_REGISTERED);
            const fieldSelected = Object.keys(req.body)[0];
            const value = req.body[fieldSelected];
            const plainpwd = req.body.pwd;
            if (fieldSelected === "username") {
                collection
                    .find()
                    .filter({ "user.username": value })
                    .toArray((err, users) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err)
                        suscriber.error(err);
                    if (!users[0])
                        suscriber.error("This user don't exist, consider register");
                    const hashedPwd = users[0].user.pwd;
                    yield verifyPwd(plainpwd, hashedPwd).then((value) => __awaiter(void 0, void 0, void 0, function* () {
                        if (value) {
                            delete users[0].user.pwd;
                            const body = JSON.stringify(users[0].user);
                            let tokenResponse = "";
                            generateToken(body).subscribe({
                                next: (token) => (tokenResponse = token),
                            });
                            const response = users[0].user;
                            response.token = tokenResponse;
                            suscriber.next(response);
                            yield client.close().finally(() => {
                                suscriber.complete();
                            });
                        }
                        else {
                            yield client.close().finally(() => {
                                suscriber.error("Incorrect password.");
                                suscriber.complete();
                            });
                        }
                    }));
                }));
            }
            else {
                collection
                    .find()
                    .filter({ "user.email": value })
                    .toArray((err, users) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err)
                        suscriber.error(err);
                    const hashedPwd = users[0].user.pwd;
                    yield verifyPwd(plainpwd, hashedPwd).then((value) => __awaiter(void 0, void 0, void 0, function* () {
                        if (value) {
                            delete users[0].user.pwd;
                            const body = JSON.stringify(users[0].user);
                            let tokenResponse = "";
                            generateToken(body).subscribe({
                                next: (token) => (tokenResponse = token),
                            });
                            const response = users[0].user;
                            response.token = tokenResponse;
                            suscriber.next(response);
                            yield client.close().finally(() => {
                                suscriber.complete();
                            });
                        }
                        else {
                            yield client.close().finally(() => {
                                suscriber.error("Incorrect password.");
                                suscriber.complete();
                            });
                        }
                    }));
                }));
            }
        }));
    });
};
export default checkUser;
//# sourceMappingURL=database.queries.login.js.map