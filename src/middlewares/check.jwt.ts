import { verifyJwt } from "../jwt.auth/jwt.js";
import { CustomValidator } from "express-validator";

const validateJwt: CustomValidator = (value: string) => {
  return new Promise<boolean>((resolve, reject) => {
    verifyJwt(value).subscribe({
      next: (token) => {
        if (token) resolve(true);
      },
      error: (err) => { if(err) reject(false) },
    });
  });
};

export default validateJwt