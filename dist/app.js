var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import { checkUser } from "./database/database.queries.api.js";
import helmet from "helmet";
import geoip from "geoip-lite";
import requestip from 'request-ip';
const { getClientIp } = requestip;
const { lookup } = geoip;
dotenv.config();
const app = express();
let port = process.env.PORT || 5000;
app.use(cors({ origin: "*", credentials: true }));
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use((req, res, next) => {
    console.log(req.body);
    next();
});
app.post("/register-user", body("email")
    .isEmail()
    .isString()
    .exists({ checkFalsy: true, checkNull: true })
    .normalizeEmail(), body("username")
    .isString()
    .isLength({ min: 4 })
    .exists({ checkFalsy: true, checkNull: true }), body("pwd")
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
        let clientip = getClientIp(req);
        res.status(200).json({
            message: req.body.username + "! Thanks for your visit! since " + lookup(clientip).country + " :D",
        });
    }
}));
app.post("/login-user", body("username").isString(), body("pwduser").isStrongPassword(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validationResult(req).isEmpty())
        res.status(401).json({
            message: "No authorized",
            errors: validationResult(req).array(),
        });
    const body = req.body;
    checkUser(body);
}));
app.post("/login-user-api", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
app.listen(port, () => console.log("running on http://localhost:" + port));
//# sourceMappingURL=app.js.map