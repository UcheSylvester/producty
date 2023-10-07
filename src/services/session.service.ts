import { FilterQuery } from "mongoose";
import SessionModel, { SessionDocument, SessionInput } from "../models/session.model";
import { jwtSign, jwtVerify } from "../utils/jwt.utils";
import { JwtPayload } from "jsonwebtoken";
import { findUser } from "./user.service";
import config from 'config'

export const createSession = async (input: SessionInput) => {
  const session = await SessionModel.create(input);
  return session.toJSON();

}

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
  const sessions = await SessionModel.find(query).lean();
  return sessions;
}

export const updateSession = async(query: FilterQuery<SessionDocument>, updates: Partial<SessionDocument>) => {
  const session = await SessionModel.updateOne(query, updates);
  return session
}

export const findSession = async (query: FilterQuery<SessionDocument>) => {
  return await SessionModel.findOne(query).lean();
}

const verifyUserRefreshTokenSession = async (refreshToken: string) => {
  const payload = jwtVerify(refreshToken);
  const decoded = payload.decoded as JwtPayload | undefined;

  // if there is not encoded data or no _id in the decoded data return false
  if(!decoded || !decoded?._id) return false;

  // confirm if there is an existing valid session
  const session = await findSession({_id: decoded?.session})
  if(!session || !session?.valid) return false;

  // confirm if the session has a valid user
  const user = await findUser({_id: session.user})
  if(!user) return false;

  return {...user, session: session._id }
}

export const reIssueAccessToken = async (refreshToken: string) => {
  const user = await verifyUserRefreshTokenSession(refreshToken);

  if(!user) return false;

  // reissue access token
  const accessToken = jwtSign(
    { ...user, },
    { expiresIn: config.get<string>("accessTokenTtl") }
  )

  return accessToken;
}