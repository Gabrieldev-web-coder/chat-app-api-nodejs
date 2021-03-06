var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import { setDefault } from "./set.default.js";
const generateUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield setDefault(req);
    return yield new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err)
                reject(err.name + " " + err.message);
            bcrypt.hash(user.pwd, salt, (err, hashed) => {
                if (err)
                    reject(err.name + " " + err.message);
                user.pwd = hashed;
                resolve(user);
            });
        });
    });
});
export { generateUser };
//# sourceMappingURL=generate.user.js.map