import { Router, Request, Response } from "express";
import { validationResult, body, header } from "express-validator";
import validateJwt from "../middlewares/check.jwt.js";
import removePendingUser from "../database/db.qr.remove.pending.js";
const removePending = Router().post(
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
  body("type").isString().exists({ checkNull: true, checkFalsy: true }),
  (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      res.status(401).json({ errors: validationResult(req).array() });
    } else {
      const { type, id } = req.body;
      removePendingUser(req, type).subscribe({
        next: (val) =>
          val
            ? res.status(200).json({
                message: `User: ${id} removed successfully from your ${type} list`,
              })
            : res.status(501).json({
                error: `Something went wrong removing this ${type} from your list`,
              }),

        error: (err) => res.status(501).json({ error: err }),
      });
    }
  }
);

export default removePending;
