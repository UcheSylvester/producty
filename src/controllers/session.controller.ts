import { Request, Response } from "express";
import { validateUserPassword as validatePassword } from "../services/user.service";
import { createSession, findSessions } from "../services/session.service";
import { jwtSign } from "../utils/jwt.utils";
import config from "config";
import { omit } from "lodash";

export const createSessionHandler = async (req: Request, res: Response) => {
  try {
    // validate password
    const user = await validatePassword(req.body);

    if(!user) return res.status(401).send("Invalid username or password");

    // create session
    const session = await createSession({user: user._id, userAgent: req.get("user-agent") || ""});

    // create access token
    const accessToken = jwtSign(
      { ...user, session: session._id, },
      { expiresIn: config.get<string>("accessTokenTtl") }
    )

    // create refresh token
    const refreshToken = jwtSign(
      { ...user, session: session._id },
      { expiresIn: config.get<string>("refreshTokenTtl") }
    )

    return res.send({ accessToken, refreshToken, user: omit(user, "password") })
  } catch (error: any) {
    console.log({error})
    return res.status(400).send(error.message)
  }
}

export const getUserSessionsHandler = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id;
    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}