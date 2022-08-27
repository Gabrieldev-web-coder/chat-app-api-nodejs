import { Router } from "express";
import dotenv from "dotenv";
import validateJwt from "../middlewares/check.jwt.js";
import { validationResult, header, body } from "express-validator";
import removeFriendList from "../database/db.qr.remove.friend.js";

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
  (req, res) => {
    if (!validationResult(req).isEmpty()) {
      res.status(401).json({ errors: validationResult(req).array() });
    } else {
      const { id } = req.body;
      removeFriendList(req).subscribe({
        next: (updated) =>
          updated
            ? res.status(200).json({
                message: `You have removed user ${id} from your friend list!`,
              })
            : res.status(501).json({
                message: `Maybe you dont have ${id} user in your friend list`,
              }),
        error: (err) => res.status(501).json({ error: err }),
      });
    }
  }
);

export default removeFriend;
