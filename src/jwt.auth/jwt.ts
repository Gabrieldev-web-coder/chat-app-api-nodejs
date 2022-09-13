import { Observable } from "rxjs";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

const { sign, verify } = jwt;

dotenv.config();

const generateToken = (body: string): Observable<string> => {
  return new Observable((suscriber) => {
    const parsedBody = JSON.parse(body);
    delete parsedBody.pwd;
    const token = sign(parsedBody, process.env.SECRET, { expiresIn: "2d" });
    suscriber.next(token);
  });
};

const verifyJwt = (token: string): Observable<string | JwtPayload> => {
  return new Observable((suscriber) => {
    const decoded = verify(token, process.env.SECRET);
    if (!decoded)
      suscriber.error(
        "Given token was modified, was not provided by server, or expired. "
      );
    suscriber.next(decoded);
  });
};

export { generateToken, verifyJwt };
