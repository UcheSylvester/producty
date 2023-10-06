import UserModel, { UserInput } from "../models/user.model";

export const createUserService = async (input: UserInput) => {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error)
  }
}