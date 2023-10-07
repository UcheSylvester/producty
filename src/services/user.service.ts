import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import { FilterQuery } from "mongoose";

export const createUser = async (input: UserInput) => {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error)
  }
}

export const validatePassword = async ({email, password}: Omit<UserInput, 'name'>) => {
  const user = await UserModel.findOne({email});
  if (!user) return false;

  const isValid = await user.comparePassword(password);
  if (!isValid) return false;

  return omit(user.toJSON(), "password");

}

export const findUser = async (query: FilterQuery<UserDocument>) => {
  return await UserModel.findOne(query).lean();
}
