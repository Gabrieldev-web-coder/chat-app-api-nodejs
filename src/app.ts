import express, { Response, Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import { checkUser } from "./database/database.queries.api.js";
import helmet from "helmet";
import { setDefault } from "./middlewares/set.default.js";
import {generateUser} from './middlewares/generate.user.js'
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

app.post(
  "/register-user",
  body("email")
    .isEmail()
    .isString()
    .exists({ checkFalsy: true, checkNull: true })
    .normalizeEmail(),
  body("username")
    .isString()
    .isLength({ min: 4 })
    .exists({ checkFalsy: true, checkNull: true }),
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
      const body = await generateUser(req)
      res.status(200).json({body})
    }
  }
);

app.post(
  "/login-user",
  body("username").isString(),
  body("pwduser").isStrongPassword(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty())
      res.status(401).json({
        message: "No authorized",
        errors: validationResult(req).array(),
      });
    const body = req.body;
    checkUser(body);
  }
);

app.post("/login-user-api", async (req: Request, res: Response) => {});

app.listen(port, () => console.log("running on http://localhost:" + port));
