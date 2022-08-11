import { Router } from "express";
import sendRequest from "../database/database.queries.request.user.js";

const userFriendRequest = Router().post(
  "/chat-api/v1.0/friend-request",
  (req, res) => {
    sendRequest(req)
      .subscribe({
        next: (success) => res.status(200).json({ message: success ? "Friend request send successfully!" : "Cannot send friend request. Try later." }),
        error: (err) => res.status(501).json({ error: err })
      })
  }
);

export default userFriendRequest;
