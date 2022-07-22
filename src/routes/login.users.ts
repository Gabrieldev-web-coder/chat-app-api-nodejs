import { Request, Response, Router } from "express";
import { validationResult, body } from "express-validator";

const login = Router().post('/chatapiv1/login-user',
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

export default login;
