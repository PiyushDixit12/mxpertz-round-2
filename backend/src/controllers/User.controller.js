import {isValidObjectId} from "mongoose";
import {Interview} from "../models/Interview.models.js";
import {Student} from "../models/Student.models.js";
import {User} from "../models/User.models.js";
import {ResponseFormat} from "../utils/ResponseFormat.js";
import jwt from 'jsonwebtoken';
import {Result} from "../models/Result.models.js";





export const singUpUser = async (req,res) => {
    try {
        const {email,password,name} = req.body;
        // const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({email,password: password,name});
        await user.save();
        res.status(201).send(ResponseFormat(201,'User created successfully',user));
    } catch(error) {
        res.status(500).send(ResponseFormat(500,'Error creating user',null,false,error.message));
    }
};


export const userLogin = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email}).select("-__v");
        if(!user) {
            return res.status(404).send(ResponseFormat(404,'User not found',null,false));
        }
        // const isMatch = await bcrypt.compare(password,user.password);
        const isMatch = await user.isPasswordCorrect(password);
        if(!isMatch) {
            return res.status(401).send(ResponseFormat(401,'Invalid credentials',null,false));
        }
        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET);
        res.cookie('token',token,{httpOnly: true});
        res.send(ResponseFormat(200,'Login successful',{user,token}));
    } catch(error) {
        res.status(500).send(ResponseFormat(500,'Error logging in',null,false,error.message));
    }
};



// Get students created by userId controller
export const getStudentsByUserId = async (req,res) => {
    try {
        const userId = req.params.userId; // Assuming userId is passed in the request params
        const students = await Student.find({userId}).select("-__v"); // Assuming Student model has a field `userId`
        res.send(ResponseFormat(200,'Students fetched successfully',students));
    } catch(error) {
        res.status(500).send(ResponseFormat(500,'Error fetching students',null,false,error.message));
    }
};

// get Interviews by userId controller
export const getInterviewsByUserId = async (req,res) => {
    try {
        const {userId} = req.params; // Assuming userId is in the URL params

        // Find interviews by userId
        const interviews = await Interview.find({userId}).select("-__v");

        if(!interviews || interviews.length === 0) {
            return res.status(404).json(ResponseFormat(404,'Interviews not found for this user',[],false));
        }

        return res.json(ResponseFormat(200,'Interviews found',interviews));
    } catch(error) {
        console.error('Error fetching interviews:',error);
        return res.status(500).json(ResponseFormat(500,'Internal Server Error',null,false,error.message));
    }
};

export const getAllResultsByUserId = async (req,res) => {
    try {
        const {userId} = req.params; // Assuming userId is passed in the request parameters

        // Validate userId as a valid ObjectId
        if(!isValidObjectId(userId)) {
            throw new Error('Invalid userId');
        }

        // Query the database to get all results for the userId
        const results = await Result.find({userId});

        // Create a successful response format
        const response = ResponseFormat(200,'Results retrieved successfully',results);
        res.status(200).json(response); // Send the response with results
    } catch(error) {
        // Create an error response format
        const response = ResponseFormat(400,'Error fetching results',null,false,error.message);
        res.status(400).json(response); // Send the error response
    }
};