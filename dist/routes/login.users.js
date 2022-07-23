var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { validationResult, body } from "express-validator";
const login = Router().post("/chatapiv1/login-user", body("username")
    .isString()
    .isLength({ min: 4 })
    .optional(true), body("email")
    .isString()
    .isEmail()
    .normalizeEmail()
    .optional(true), body("pwd")
    .isString()
    .isLength({ min: 8 })
    .exists({ checkFalsy: true, checkNull: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validationResult(req).isEmpty()) {
        res.status(401).json({
            message: "No authorized",
            errors: validationResult(req).array(),
        });
    }
    else {
        console.log(req.body);
        res.status(200).json({ msg: 'Ok' });
    }
}));
export default login;
//# sourceMappingURL=login.users.js.map