import { Router } from "express";
import { validationResult, body } from "express-validator";
import { Response, Request } from "express";

const login = Router().post(
  "/chatapiv1/login-user",
  body("username")
    .isString()
    .isLength({ min: 4 })
    .exists({ checkFalsy: true, checkNull: true }) ||
    body("email")
      .isString()
      .isEmail()
      .normalizeEmail()
      .exists({ checkFalsy: true, checkNull: true }),
  body("pwduser")
    .isString()
    .isLength({ min: 8 })
    .exists({ checkFalsy: true, checkNull: true }),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      res.status(401).json({
        message: "No authorized",
        errors: validationResult(req).array(),
      });
    }
  }
);

export default login;
