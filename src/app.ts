import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middleware/handle-error";

const Port = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(errorHandlerMiddleware);

app.listen(Port, () => {
  console.log(`Server running on localhost:${Port}`);
});

