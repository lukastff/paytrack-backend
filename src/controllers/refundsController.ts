import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const CategoriesEnum = z.enum([
  "food",
  "others",
  "services",
  "transport",
  "accommodation",
]);

class RefundsController {
  async create(req: Request, res: Response, next: NextFunction) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(1, { message: "Enter the name of the request" }),
      category: CategoriesEnum,
      amount: z.number().positive({ message: "The value must be positive" }),
      filename: z.string().min(20),
    });

    const { name, category, amount, filename } = bodySchema.parse(req.body);

    res.json({ message: "hello moto" });
  }
}

export { RefundsController };
