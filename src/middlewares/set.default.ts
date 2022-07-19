import { Request } from "express";
import geoip from "geoip-lite";
import { getClientIp } from "request-ip";
import uuidint from "uuid-int";
import { registerNewUser } from '../schemas/cred.user.js';

const { lookup } = geoip;

const setDefault = async (req: Request):Promise<registerNewUser> => {
  const ip = getClientIp(req);
  const idAssign = Number(
    String(uuidint(0).uuid()).split("").splice(12, 4).join("")
  );
  req.body.userid = idAssign;
  req.body.picurl = "https://svgsilh.com/svg/1699635.svg";
  req.body.country = lookup(ip).country.toLowerCase();
  req.body.groups = [];
  req.body.friends = [];
  return req.body;
};

export { setDefault };
