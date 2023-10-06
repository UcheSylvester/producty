import SessionModel, { SessionInput } from "../models/session.model";

export const createSession = async (input: SessionInput) => {
  try {
    const session = await SessionModel.create(input);
    return session.toJSON();
  } catch (error: any) {
    throw new Error(error)
  }
}