import { Router } from "express";
import { validationResult, body } from "express-validator";
import { Response, Request } from "express";
import { registerUser } from "../database/database.queries.register.js";
import { generateUser } from "../middlewares/generate.user.js";

const register = Router().post(
  "chatapiv1/register-user",
  body("email")
    .isEmail()
    .isString()
    .exists({ checkNull: true, checkFalsy: true })
    .normalizeEmail(),
  body("username")
    .isString()
    .isLength({ min: 4 })
    .exists({ checkNull: true, checkFalsy: true }),
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
      const body = await generateUser(req)
      registerUser(body)
      .subscribe({
        next:(value) => res.status(200).json({result:value}),
        error:(err) => res.status(501).json({errors:err})
      })
    }
  }
);

export default register;
