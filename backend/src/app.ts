import express from "express";
import cors from "cors";
import morgan from "morgan";
//import routes from "./routes";
import { errorHandler } from "./middlewares/auth.middleware";
import { authRouter } from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import {adminRouter} from "./routes/admin.routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth",authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin",adminRouter);

app.use(errorHandler);
