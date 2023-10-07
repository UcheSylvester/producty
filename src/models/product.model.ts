import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface ProductInput {
  title: string;
  description: string;
  price: number;
  image: string;
}
export interface ProductDocument extends ProductInput, mongoose.Document {
  user: UserDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<ProductDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
