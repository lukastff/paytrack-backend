import { Request, Response, NextFunction } from "express";

class UploadsController {
  async create(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "hello moto" });
  }
}

export { UploadsController };
