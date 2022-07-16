var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import geoip from "geoip-lite";
import { getClientIp } from "request-ip";
import uuidint from "uuid-int";
const { lookup } = geoip;
const setDefault = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ip = getClientIp(req);
    const idAssign = Number(String(uuidint(0).uuid()).split("").splice(0, 4).join(""));
    req.body.userid = idAssign;
    req.body.picurl = "https://svgsilh.com/svg/1699635.svg";
    req.body.country = lookup(ip).country;
    req.body.groups = [];
    req.body.friends = [];
    res.status(200).json(req.body);
});
export { setDefault };
//# sourceMappingURL=set.default.js.map