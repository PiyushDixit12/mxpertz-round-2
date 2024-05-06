import {Router} from "express";
import {getAllResultsByUserId,getInterviewsByUserId,getStudentsByUserId,singUpUser,userLogin} from "../controllers/User.controller.js";


export const userRouter = Router();



// Sign up endpoint
userRouter.post('/sign-up',singUpUser);

// Login endpoint
userRouter.post('/login',userLogin);

// get students by userId
userRouter.get("/getStudents/:userId",getStudentsByUserId);

// get interviews by userId
userRouter.get("/getInterviews/:userId",getInterviewsByUserId);

// get results of students by userId
userRouter.get("/getStudentResults/:userId",getAllResultsByUserId);
