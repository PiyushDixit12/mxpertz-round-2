import {Router} from "express";
import {createStudent} from "../controllers/Student.controller.js";


export const studentRouter = Router();

// create a student 

studentRouter.post("/",createStudent);

