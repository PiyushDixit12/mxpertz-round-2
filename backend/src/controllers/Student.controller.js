import {Student} from "../models/Student.models.js";
import {ResponseFormat} from "../utils/ResponseFormat.js";


export const createStudent = async (req,res) => {
    const {name,college,status,userId} = req.body;

    if(!name || !college || !status || !userId) {
        const response = ResponseFormat(400,'Missing required fields',null,false);
        return res.status(400).json(response);
    }

    try {
        // Create a new student instance and save it
        const newStudent = new Student({name,college,status,userId});
        const savedStudent = await newStudent.save();

        // Send success response
        const response = ResponseFormat(201,'Student created successfully',savedStudent);
        res.status(201).json(response);
    } catch(error) {
        console.error('Error creating student:',error);

        // Send error response
        const response = ResponseFormat(500,'Error creating student',null,false,error.message);
        res.status(500).json(response);
    }
};