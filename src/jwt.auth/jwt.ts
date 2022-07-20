import {sign,verify,JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv";
import { Observable } from "rxjs";

dotenv.config();

const generateToken = (body: string): Observable<string> => {
  return new Observable((suscriber) => {
    sign(
      body,
      process.env.SECRET,
      { algorithm: "RS256" },
      (err, payload) => {
        if (err) return suscriber.error("Error generating jwt: " + err.message);
        suscriber.next(payload);
      }
    );
    suscriber.complete();
  });
};

const verifyJwt = (token: string): Observable<string | JwtPayload> => {
  return new Observable((suscriber) => {
    const decoded = verify(token, process.env.SECRET);
    if (!decoded)
      suscriber.error(
        "Given token was modified or was not provided by server."
      );
    suscriber.next(decoded);
    suscriber.complete();
  });
};

export { generateToken, verifyJwt }
