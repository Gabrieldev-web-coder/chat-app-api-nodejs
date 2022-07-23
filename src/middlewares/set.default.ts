import { Request, Response } from "express";
import geoip from "geoip-lite";
import { getClientIp } from "request-ip";
import uuidint from "uuid-int";
import { registerNewUser } from "../schemas/cred.user.js";
import moment from "moment";
const { lookup } = geoip;

const setDefault = async (req: Request): Promise<registerNewUser> => {
  const ip = getClientIp(req);
  const idAssign = Number(
    String(uuidint(0).uuid()).split("").splice(12, 4).join("")
  );
  req.body.userid = idAssign;
  req.body.picurl = "https://svgsilh.com/svg/1699635.svg";
  req.body.country = lookup(ip).country.toLowerCase();
  req.body.accountCreatedAt = moment().format("LLLL");
  req.body.description = `Hi! i'm ${req.body.username}, nice to meet you! :D`;
  req.body.lastMoficationAt = 'No changes yet.'
  req.body.groups = [];
  req.body.friends = [];
  return req.body;
};

export { setDefault };
