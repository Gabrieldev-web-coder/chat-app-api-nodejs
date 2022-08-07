import { Request, Response, Router } from "express";
import { validationResult, body } from "express-validator";
import validateJwt from "../middlewares/check.jwt.js";
import updateUserFields from "../middlewares/update.user.fields.js";

const update = Router().put(
  "/chat-api/v1.0/update-user",
  body("email")
    .optional(true)
    .isEmail()
    .normalizeEmail()
    .exists({ checkFalsy: true, checkNull: true }),
  body("username")
    .optional(true)
    .isLength({ min: 4 })
    .exists({ checkFalsy: true, checkNull: true }),
  body("pwd")
    .optional(true)
    .isLength({ min: 8 })
    .exists({ checkFalsy: true, checkNull: true }),
  body("picurl")
    .optional(true)
    .isURL()
    .optional()
    .exists({ checkFalsy: true, checkNull: true })
    .isBase64()
    .optional()
    .exists({ checkFalsy: true, checkNull: true })
    .exists({ checkFalsy: true, checkNull: true }),
  body("country").optional(true).isString().isLength({ min: 2 }).isLowercase(),
  body("description").optional(true).isString().isLength({ min: 10, max: 320 }),
  body("token")
    .isJWT()
    .isString()
    .exists({ checkFalsy: true, checkNull: true })
    .custom(validateJwt),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      res.status(401).json({
        message: "No authorized",
        errors: validationResult(req).array(),
      });
    } else {
      await updateUserFields(req)
        .then((value) => res.status(200).json({ message: value }))
        .catch((err) => res.status(500).json({ error: err }));
    }
  }
);

export default update;
