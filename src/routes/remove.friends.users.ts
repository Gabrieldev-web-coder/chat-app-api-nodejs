import { Router } from "express";
import dotenv from "dotenv";
import validateJwt from "../middlewares/check.jwt";
import { validationResult, header, body } from "express-validator";

dotenv.config();

const removeFriend = Router().post(
  "/chat-api/v1.0/remove-friend",
  header("Authorization"),
  body("token")
    .isJWT()
    .isString()
    .exists({ checkNull: true, checkFalsy: true })
    .custom(validateJwt),
  body("id").isNumeric().exists({ checkNull: true, checkFalsy: true }),
  body("emitterId").isNumeric().exists({ checkNull: true, checkFalsy: true }),
  body("type").isString().exists({ checkNull: true, checkFalsy: true }),
  (req, res) => {
    if (!validationResult(req).isEmpty()) {
      res.status(401).json({ errors: validationResult(req).array() });
    } else {
      //Some stuff...
    }
  }
);

export default removeFriend;
