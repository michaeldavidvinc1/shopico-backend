import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middleware/handle-error";
import config from "./config";
import {publicApi} from "./api/router/public-api";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', publicApi);

// @ts-ignore
app.use(errorHandlerMiddleware);

app.listen(config.port, () => {
  console.log(`Server running on localhost:${config.port}`);
});

