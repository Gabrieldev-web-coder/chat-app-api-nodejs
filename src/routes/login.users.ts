import { Router } from "express";
import { validationResult, body } from "express-validator";
import { Response,Request } from "express";

const login = Router().post('/login-user',
body('username')
.isString()
.isLength({min:4}),
body('pwduser')
.isString().isLength({min:8}),
async (req:Request,res:Response)=>{
    if (!validationResult(req).isEmpty()){
        res.status(401).json({
          message: "No authorized",
          errors: validationResult(req).array(),
        });
      }
}
)

export default login