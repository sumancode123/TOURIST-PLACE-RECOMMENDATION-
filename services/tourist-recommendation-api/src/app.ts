import cors from "cors";
import express from "express";
import { config } from "./config.js";
import { errorHandler } from "./middleware/error-handler.js";
import { apiRouter } from "./routes/api.js";

export const app = express();

app.disable("x-powered-by");
app.use(cors({ origin: config.webOrigin }));
app.use(express.json({ limit: "16kb" }));
app.use("/api", apiRouter);
app.use(errorHandler);
