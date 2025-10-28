import { Request, Response, NextFunction } from "express";

class UsersController {
  async create(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "OK" });
  }
}

export { UsersController };
