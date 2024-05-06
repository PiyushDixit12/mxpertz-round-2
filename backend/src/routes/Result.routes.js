
import {Router} from "express";
import {createCourseScoreAndUpdateResult,updateResult} from "../controllers/Result.controller.js";

export const resultRouter = Router();

// update result 
resultRouter.put("/",updateResult);

// create a new score and update a result
resultRouter.post("/createScoreAndUpdateResult",createCourseScoreAndUpdateResult);



