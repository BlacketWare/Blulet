import { Request, Response, NextFunction } from "express";
import { readFileSync } from "fs";
import Blacklist from "../schema/Blacklist";

export default async (req: Request, res: Response, next: NextFunction) => {
    const blacklist = await Blacklist.findOne({ ip: req.ip });
    if (blacklist) return res.send(readFileSync("./src/html/blacklisted.html", "utf8").replace("{{reason}}", blacklist.reason));
    return next();
};