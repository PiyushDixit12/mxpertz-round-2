import {Router} from "express";
import {createInterview} from "../controllers/Interview.controller.js";

export const interviewRouter = Router();

interviewRouter.post("/",createInterview);
