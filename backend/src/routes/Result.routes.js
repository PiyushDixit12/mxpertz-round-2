
import {Router} from "express";
import {updateResult} from "../controllers/Result.controller.js";

export const resultRouter = Router();

resultRouter.put("/",updateResult);


