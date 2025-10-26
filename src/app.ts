import express from "express";
import cors from "cors";
import { errorHandling } from "./middlewares/errorHandling";
import { AppError } from "./utils/AppError";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  throw new AppError("Socorro deus");

  res.send("Hello Bin");
});

app.use(errorHandling);

export { app };
