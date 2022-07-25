import { Request } from "express";

const selectFields = (keys:string[],req:Request) => {
    const fields = {}
    for (let i = 0; i < keys.length; i++) fields[keys[i]] = req.body[keys[i]];
    return fields
}

export default selectFields

