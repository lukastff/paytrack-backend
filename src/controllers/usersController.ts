import { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";
import z from "zod";

class UsersController {
  async create(req: Request, res: Response, next: NextFunction) {
    const bodySchema = z.object({
      name: z.string().trim().min(2, { message: "Nome é obrigatório" }),
      email: z
        .string()
        .trim()
        .email({ message: "E-mail inválido" })
        .toLowerCase(),
      password: z
        .string()
        .min(6, { message: "A senha deve ter pelo menos 6 dígitos" }),
      role: z
        .enum([UserRole.employee, UserRole.manager])
        .default(UserRole.employee),
    });

    const { name, email, password, role } = bodySchema.parse(req.body);

    res.send({ message: name, email, password, role });
  }
}

export { UsersController };
