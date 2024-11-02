import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { MainRouter } from "./app/router";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// ! rouutes
app.use("/api/v1", MainRouter);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send({ message: "server is running  !! " });
  } catch (error) {
    next(error);
  }
});

app.all("*", async (req: Request, res: Response) => {
  res.status(400).json({ success: false, message: "Route not found " });
});

//! global error handler
app.use(globalErrorHandler);

export default app;
