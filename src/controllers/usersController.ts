import { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";
import { prisma } from "@/database/prisma";
import z from "zod";
import { AppError } from "@/utils/AppError";
import { hash } from "bcrypt";

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

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    if (userWithSameEmail) {
      throw new AppError("An account with this email already exists.");
    }

    const hashedPasword = await hash(password, 8);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPasword,
        role,
      },
    });

    res.status(201).json();
  }
}

export { UsersController };
