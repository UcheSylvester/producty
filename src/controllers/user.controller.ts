import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUserService } from "../services/user.service";
import { CreateUserInput } from "../schema/user.schema";

export const createUser = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
  try {
    // call create user service
    const user = await createUserService(req.body);
    return user;
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message)
  }
}