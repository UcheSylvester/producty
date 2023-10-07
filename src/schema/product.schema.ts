import { TypeOf, number, object, string } from "zod";

export const createProductSchema = object({
  body: object({
    title: string({
      required_error: "Name is required",
    }),
    price: number({
      required_error: "Price is required",
    }),
    description: string({
      required_error: "Description is required",
    }).min(120, "Description must be at least 120 characters"),
    image: string({
      required_error: "Image is required",
    }),
  }),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
