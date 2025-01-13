import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";

import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { MainRouter } from "./app/router";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://reiment.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));

// ! rouutes
app.use("/api", MainRouter);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send({ message: "server is running  !! " });
  } catch (error) {
    next(error);
  }
});

//! global error handler
app.use(globalErrorHandler);

// ! not found route
app.all("*", async (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Api not found ",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found !!",
    },
  });
});

export default app;
