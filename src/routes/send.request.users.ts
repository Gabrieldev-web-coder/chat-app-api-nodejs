import { Router } from "express";
import sendRequest from "../database/database.queries.request.user.js";
import validateJwt from "../middlewares/check.jwt.js";
import { validationResult, header, body } from "express-validator";

const userFriendRequest = Router().post(
  "/chat-api/v1.0/friend-request",
  body("token")
    .exists({ checkNull: true, checkFalsy: true })
    .isJWT()
    .custom(validateJwt),
  body("from").exists({ checkFalsy: true, checkNull: true }),
  body("to").isNumeric().isLength({ min: 4 }),
  body("accepted").exists({ checkNull: false }),
  (req, res) => {
    if (!validationResult(req).isEmpty()) {
      res.status(401).json({
        message: "No authorized",
        errors: validationResult(req).array(),
      });
    } else {
      sendRequest(req).subscribe({
        next: (success) => res.status(200).json({ message: success }),
        error: (err) => res.status(501).json({ error: err }),
      });
    }
  }
);

export default userFriendRequest;
