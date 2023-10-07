import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../services/session.service";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.replace(/Bearer\s/, "");
  const refreshToken = req.headers["x-refresh"] as string;

  if(!accessToken) return next();

  const {  decoded, isExpired } = jwtVerify(accessToken);

  if(decoded) {
    res.locals.user = decoded;
    return next();
  }

  if(isExpired && refreshToken) {
    // reissue access token
    const newAccessToken = await reIssueAccessToken(refreshToken)
    if(newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      const { decoded } = jwtVerify(newAccessToken);
      res.locals.user = decoded;
    }
    return next();
  }

  return next();
}

export default deserializeUser