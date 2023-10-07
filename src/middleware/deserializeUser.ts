import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "../utils/jwt.utils";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.replace(/Bearer\s/, "");

  if(!accessToken) return next();

  const { isValid, decoded } = jwtVerify(accessToken);

  if(isValid && decoded) {
    res.locals.user = decoded;
    return next();
  }

  return next();

}

export default deserializeUser