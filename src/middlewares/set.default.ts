import { Request, Response } from "express";
import geoip from "geoip-lite";
import { getClientIp } from "request-ip";
import uuidint from 'uuid-int';
const { lookup } = geoip;

const setDefault = async (req: Request, res: Response) => {
  return new Promise((resolve) => {
    const ip = getClientIp(req);
    const idAssign = Number(String(uuidint(0).uuid()).split('').splice(0,4).join(''))
    req.body.userid = idAssign
    req.body.picurl = "https://svgsilh.com/svg/1699635.svg";
    req.body.country = lookup(ip).country;
    req.body.groups = [];
    req.body.friends = [];
    resolve(res.status(200).json(req.body));
  });
};

export { setDefault };
