import { Request, Response } from "express";
import { validateUserPassword } from "../services/user.service";
import { createSession } from "../services/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
import { omit } from "lodash";

export const createSessionHandler = async (req: Request, res: Response) => {
  try {
    // validate password
    const user = await validateUserPassword(req.body);

    if(!user) return res.status(401).send("Invalid username or password");

    // create session
    const session = await createSession({user: user._id, userAgent: req.get("user-agent") || ""});

    // create access token
    const accessToken = signJwt(
      { ...user, session: session._id, },
      { expiresIn: config.get<string>("accessTokenTtl") }
    )

    // create refresh token
    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get<string>("refreshTokenTtl") }
    )

    return res.send({ accessToken, refreshToken, user: omit(user, "password") })
  } catch (error: any) {
    console.log({error})
    return res.status(400).send(error.message)
  }
}