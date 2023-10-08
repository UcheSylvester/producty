import { CookieOptions, Response } from "express";
import config from "config";

export const setCookies = (
  res: Response,
  {
    key,
    value,
    options,
  }: { key: string; value: string; options?: CookieOptions }
) => {
  const defaultOptions: CookieOptions = {
    httpOnly: true,
    maxAge: 15 * 60 * 1000, // 15 minutes
    domain: config.get<string>("domain"),
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  };

  return res.cookie(key, value, {
    ...defaultOptions,
    ...options,
  });
};
