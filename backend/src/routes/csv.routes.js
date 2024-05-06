import {Router} from "express";
import {studentsToCsv,interviewToCsv} from "../controllers/Csv.controller.js";


export const csvRouter = new Router();

csvRouter.get("/student/:userId",studentsToCsv);

csvRouter.get("/interview/:userId",interviewToCsv);
