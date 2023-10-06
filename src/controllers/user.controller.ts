import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUserService } from "../services/user.service";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";

export const createUser = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
  try {
    // call create user service
    const user = await createUserService(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message)
  }
}