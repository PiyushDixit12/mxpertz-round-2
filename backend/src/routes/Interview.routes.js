import {Router} from "express";
import {createInterview,getStudentDetailsByInterviewId} from "../controllers/Interview.controller.js";
import {ResponseFormat} from "../utils/ResponseFormat.js";

export const interviewRouter = Router();

// create interview
interviewRouter.post("/",createInterview);

// get students and interview 
interviewRouter.get("/students/:interviewId",async (req,res) => {
    try {
        const interviewId = req.params.interviewId;

        // Call the controller function to get student details by interview ID
        const result = await getStudentDetailsByInterviewId(interviewId);

        // Destructure the result
        const {status,message,data,success,error} = result;

        // Send the appropriate response
        if(success) {
            res.status(status).json(ResponseFormat(status,message,data));
        } else {
            res.status(status).json(ResponseFormat(status,message,null,success,error));
        }
    } catch(error) {
        console.error('Error handling request:',error);
        res.status(500).json(ResponseFormat(500,'Internal server error',null,false,'Internal server error'));
    }
});
