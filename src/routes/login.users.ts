import { Request, Response, Router } from "express";
import { validationResult, body } from "express-validator";
import checkUser from "../database/database.queries.login.js";

const login = Router().post(
  "/chatapiv1/login-user",
  body("username")
    .isString()
    .isLength({ min: 4 }),
    body("email")
      .isString()
      .isEmail()
      .normalizeEmail(),
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
    }else{
      checkUser(req)
    }
  }
);

export default login;
