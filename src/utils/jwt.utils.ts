import jwt from "jsonwebtoken";
import fs from "fs";

const PRIVATE_KEY = fs.readFileSync("./jwtRS256.key", "utf8");
const PUBLIC_KEY = fs.readFileSync("./jwtRS256.key.pub", "utf8");

export const jwtSign = (payload: Object, options?: jwt.SignOptions) => {
  return jwt.sign(payload, PRIVATE_KEY, {
    ...options,
    algorithm: "RS256",
  });
};

export const jwtVerify = (token: string) => {
  try {
    const decoded = jwt.verify(token, PUBLIC_KEY);
    return {
      isValid: true,
      isExpired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      isValid: false,
      isExpired: error.message === "jwt expired",
      docoded: null,
    };
  }
};
