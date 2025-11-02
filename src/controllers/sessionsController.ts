import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { authConfig } from "@/configs/auth";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { z } from "zod";

class SessionsController {
  async create(req: Request, res: Response, next: NextFunction) {
    const bodySchema = z.object({
      email: z.string().email({ message: "E-mail inválido" }),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new AppError("E-mail ou senha inválido", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail ou senha inválido", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn,
    });

    const { password: _, ...userWithoutPassword } = user;

    res.json({ token, userWithoutPassword });
  }
}

export { SessionsController };
