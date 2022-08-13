import { Router } from "express";
import { validationResult, body, header } from "express-validator";
import validateJwt from "../middlewares/check.jwt";

const userFriendResponse = Router().post(
  "/chat-api/v1.0/friend-response",
  header("Authorization"),
  body("token")
    .isJWT()
    .isString()
    .exists({ checkNull: true, checkFalsy: true })
    .custom(validateJwt),
  body("id").isNumeric().exists({ checkNull: true, checkFalsy: true }),
  body("accepted").isBoolean().exists({ checkNull: false }),
  body("emitterId").isNumeric().exists({ checkNull: true, checkFalsy: true }),
  (req, res) => {
    if (!validationResult(req).isEmpty()) {
      res.status(401).json({ errors: validationResult(req).array() });
    } else {
      //...
    }
  }
);

export default userFriendResponse;
