import { RefundsController } from "@/controllers/refundsController";
import { Router } from "express";

const refundsRoutes = Router();
const refundsController = new RefundsController();

refundsRoutes.post("/", refundsController.create);

export { refundsRoutes };
