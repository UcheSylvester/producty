import { Request, Response } from "express";
import { CreateProductInput } from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findProduct,
  updateProduct,
} from "../services/product.service";
import logger from "../utils/logger";

export const createProductHandler = async (
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) => {
  try {
    const product = await createProduct(req.body);
    return res.send(product);
  } catch (error: any) {
    logger.error(error);
    return res.status(400).send(error.message);
  }
};

export const getProductHandler = async (req: Request, res: Response) => {
  try {
    logger.info({ productId: req.params.id });
    const product = await findProduct({ _id: req.params.id });
    if (!product) return res.sendStatus(404);
    return res.send(product);
  } catch (error: any) {
    logger.error(error);
    return res.status(400).send(error.message);
  }
};

export const updateProductHandler = async (
  req: Request<{ id: string }, {}, CreateProductInput["body"]>,
  res: Response
) => {
  try {
    const product = await updateProduct({ _id: req.params.id }, req.body);
    if (!product) return res.sendStatus(404);
    return res.send(product);
  } catch (error: any) {
    logger.error(error);
    return res.status(400).send(error.message);
  }
};

export const deleteProductHandler = async (req: Request, res: Response) => {
  try {
    const product = await deleteProduct({ _id: req.params.id });
    if (!product) return res.sendStatus(404);
    return res.sendStatus(200);
  } catch (error: any) {
    logger.error(error);
    return res.status(400).send(error.message);
  }
};
