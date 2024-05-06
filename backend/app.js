
import cors from 'cors';
import {userRouter} from "./src/routes/User.routes.js";
import express from 'express'
import cookieParser from 'cookie-parser';
import {batchRouter} from './src/routes/Batch.routes.js';
import {studentRouter} from './src/routes/Student.routes.js';
import {interviewRouter} from './src/routes/Interview.routes.js';
import {resultRouter} from './src/routes/Result.routes.js';
import {csvRouter} from './src/routes/csv.routes.js';

export const app = express();

app.use(cors({
    "origin": '*',
    "credentials": true
}));

app.use(express.json());
app.use(express.urlencoded({"extended": true}));

app.use(cookieParser());


// Routes 
app.use("/user",userRouter);
app.use("/batch",batchRouter);
app.use("/student",studentRouter);
app.use("/interview",interviewRouter);
app.use("/result",resultRouter);
app.use("/csv",csvRouter);