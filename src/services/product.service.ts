import { FilterQuery, UpdateQuery } from "mongoose";
import ProductModel, { ProductDocument, ProductInput } from "../models/product.model";

export const createProduct = async (product: ProductInput) => {
  return await ProductModel.create(product)
}

export const findProducts = async (query: FilterQuery<ProductDocument>) => {
  return await ProductModel.find(query).lean()
}

export const findProduct = async (query: FilterQuery<ProductDocument>) => {
  return await ProductModel.findOne(query).lean()
}

export const updateProduct = async (query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>) => {
  return await ProductModel.findOneAndUpdate(query, update, {new: true}).lean()
}

export const deleteProduct = async (query: FilterQuery<ProductDocument>) => {
  return await ProductModel.findOneAndDelete(query).lean()
}