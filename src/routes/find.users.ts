import express from "express";
import findUserById from "../middlewares/find.user.js";

const findUser = express.Router().get("/chat-api/v1.0/user", (req, res) => {
  findUserById(req).subscribe({
    next: (userRequested) => res.status(200).json({ user: userRequested }),
    error: (err) => res.status(404).json({ errors: err }),
  });
});

export default findUser;
