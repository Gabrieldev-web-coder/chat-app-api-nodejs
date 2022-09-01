import { Router } from "express";
import dotenv from "dotenv";
import validateJwt from "../middlewares/check.jwt.js";
import { validationResult, header, body } from "express-validator";
import addFriendList from "../database/db.qr.add.friend.js";

dotenv.config();

const addFriend = Router().put(
  "/chat-api/v1.0/add-friend",
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
      addFriendList(req).subscribe({
        next: (updated) =>
          updated
            ? res.status(200).json({
                message: `You added user ${id} to your friend list!`,
              })
            : res.status(501).json({
                message: `Maybe you already have this user in your friend list`,
              }),
        error: (err) => res.status(501).json({ error: err }),
      });
    }
  }
);

export default addFriend;
