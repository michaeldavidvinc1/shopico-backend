import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middleware/handle-error";
import config from "./config";
import {publicApi} from "./api/router/public-api";
import { privateApi } from "./api/router/private-api";
import { setupSwagger } from "./swagger";
process.env.TZ = "Asia/Jakarta";

const app = express();

console.log("Waktu sekarang:", new Date().toLocaleString());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

setupSwagger(app);
app.use('/api/v1', publicApi);
app.use('/api/v1', privateApi);

// @ts-ignore
app.use(errorHandlerMiddleware);

app.listen(config.port, () => {
  console.log(`Server running on localhost:${config.port}`);
});

