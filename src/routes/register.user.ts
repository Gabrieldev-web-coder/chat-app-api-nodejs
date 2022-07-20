import { Router } from "express";
import { validationResult, body } from "express-validator";
import { Response,Request } from "express";

const register = Router().post(
  "/register-user",
  body("email")
    .isEmail()
    .isString()
    .exists({ checkNull: true, checkFalsy: true })
    .normalizeEmail(),
  body("username")
    .isEmail()
    .isString()
    .isLength({ min: 4 })
    .exists({ checkNull: true, checkFalsy: true }),
  body("pwd")
    .isString()
    .isLength({ min: 8 })
    .exists({ checkFalsy: true, checkNull: true }),
    async (req:Request,res:Response)=>{
      if (!validationResult(req).isEmpty()){
        res.status(401).json({
          message: "No authorized",
          errors: validationResult(req).array(),
        });
      }
    }
);

export default register 