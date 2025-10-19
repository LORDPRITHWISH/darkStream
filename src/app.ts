import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware";

import healthcheakrouter from "./routes/healthcheak.routes";
import actionRoute from "./routes/action.routes";
import videoRouter from "./routes/video.routes";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

//common middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1/healthcheak", healthcheakrouter);
// app.use("/api/v1/users", userrouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/action", actionRoute);
// app.use("/api/v1/playlist", playlistRoute);
// app.use("/api/v1/dashboard", dashBoardRoute);

// Error handling middleware

app.use(errorHandler);

export { app };
