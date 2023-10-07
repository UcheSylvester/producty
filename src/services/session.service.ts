import { FilterQuery } from "mongoose";
import SessionModel, { SessionDocument, SessionInput } from "../models/session.model";

export const createSession = async (input: SessionInput) => {
  const session = await SessionModel.create(input);
  return session.toJSON();

}

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
  const sessions = await SessionModel.find(query).lean();
  return sessions;
}
