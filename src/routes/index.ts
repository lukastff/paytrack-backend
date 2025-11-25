import { Router } from "express";
import { usersRoutes } from "./usersRoutes";
import { sessionsRoutes } from "./sessionsRoutes";
import { refundsRoutes } from "./refundsRoutes";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { uploadsRoutes } from "./uploadsRoutes";

const routes = Router();

// Public Routes
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);

// Private Routes
routes.use(ensureAuthenticated);
routes.use("/refunds", refundsRoutes);
routes.use("/uploads", uploadsRoutes);

export { routes };
