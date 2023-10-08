import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../services/user.service";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";

export const createUserHanlder = async (
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) => {
  try {
    // call create user service
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    return res.send({ user: res.locals.user });
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};
