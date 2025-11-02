import { Request, Response, NextFunction } from "express";
import { z } from "zod";

class SessionsController {
  async create(req: Request, res: Response, next: NextFunction) {
    const bodySchema = z.object({
      email: z.string().email({ message: "E-mail inválido" }),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(req.body);

    res.json({ email, password });
  }
}

export { SessionsController };
