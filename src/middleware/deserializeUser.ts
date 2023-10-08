import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../services/session.service";
import { setCookies } from "../utils/cookies.utils";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    req.cookies?.accessToken ||
    req.headers.authorization?.replace(/Bearer\s/, "");
  const refreshToken =
    req.cookies?.refreshToken || (req.headers["x-refresh"] as string);

  if (!accessToken) return next();

  const { decoded, isExpired } = jwtVerify(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (isExpired && refreshToken) {
    // reissue access token
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      setCookies(res, {
        key: "accessToken",
        value: newAccessToken,
        options: {
          maxAge: 15 * 60 * 1000, // 15 minutes
        },
      });
      const { decoded } = jwtVerify(newAccessToken);
      res.locals.user = decoded;
    }
    return next();
  }

  return next();
};

export default deserializeUser;
