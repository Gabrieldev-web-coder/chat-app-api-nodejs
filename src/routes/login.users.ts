import { Request, Response, Router } from "express";
import { validationResult, body } from "express-validator";
import checkUser from "../database/db.qr.login.js";

const login = Router().post(
  "/chat-api/v1.0/login-user",
  body("username").isString().isLength({ min: 4 }).optional(true),
  body("email").isString().isEmail().normalizeEmail().optional(true),
  body("pwd")
    .isString()
    .isLength({ min: 8 })
    .exists({ checkFalsy: true, checkNull: true }),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      res.status(401).json({
        message: "No authorized",
        errors: validationResult(req).array(),
      });
    } else {
      checkUser(req).subscribe({
        next: (value) => res.status(200).json({ result: value }),
        error: (err) => res.status(500).json({ errors: err }),
      });
    }
  }
);

export default login;
