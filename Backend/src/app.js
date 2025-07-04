import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import multer from "multer";

const upload = multer();
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',  // or wherever your frontend is
    credentials: true
}));
app.use(upload.none()); 
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);

export default app;
