import { omit } from "lodash";
import UserModel, { UserInput } from "../models/user.model";

export const createUser = async (input: UserInput) => {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error)
  }
}

export const validateUserPassword = async ({email, password}: Omit<UserInput, 'name'>) => {
  const user = await UserModel.findOne({email});
  if (!user) return false;

  const isValid = await user.comparePassword(password);
  if (!isValid) return false;

  return omit(user.toJSON(), "password");

}