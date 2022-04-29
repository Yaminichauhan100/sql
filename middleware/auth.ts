import { Request, Response, NextFunction } from "express";
import { STATUS_MSG } from "../constant/app.constatnt";
import jwt from "jsonwebtoken";
// import user from "../model/user.model";
export default async function verifytoken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token: string | undefined = req.headers.authorization;
    if (!token) {
      res.status(400).json(STATUS_MSG.ERROR.HEADER_MISSING);
    } else {
      let data: any = jwt.verify(token, "yamini");
      req.body.idFromAuth = data;
      next();
    }
  } catch (err) {
    res.status(400).json(STATUS_MSG.ERROR.INVALID_TOKEN);;
  }
}