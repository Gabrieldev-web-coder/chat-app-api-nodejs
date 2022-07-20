import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Observable } from "rxjs";
const { sign, verify } = jwt;
dotenv.config();
const generateToken = (body) => {
    return new Observable((suscriber) => {
        const token = sign({ body }, process.env.SECRET);
        suscriber.next(token);
    });
};
const verifyJwt = (token) => {
    return new Observable((suscriber) => {
        const decoded = verify(token, process.env.SECRET);
        if (!decoded)
            suscriber.error("Given token was modified or was not provided by server.");
        suscriber.next(decoded);
    });
};
export { generateToken, verifyJwt };
//# sourceMappingURL=jwt.js.map