import { Request, Response, NextFunction } from "express";

class RefundsController {
  async create(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "hello moto" });
  }
}

export { RefundsController };
