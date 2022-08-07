import { decode, JwtPayload } from "jsonwebtoken";
import { Request } from "express";

const getUserId = (req:Request):number => {
    const userBody = decode(req.body.token, { complete: true });
    const payload = userBody.payload as JwtPayload;
    const { userid } = JSON.parse(payload.body);
    return userid
}

export default getUserId