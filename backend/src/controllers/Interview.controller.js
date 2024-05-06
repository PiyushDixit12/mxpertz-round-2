import mongoose from 'mongoose';
import {Interview} from '../models/Interview.models.js';
import {User} from '../models/User.models.js';
import {Student} from '../models/Student.models.js';
import {ResponseFormat} from '../utils/ResponseFormat.js';
import {createResultWithData} from './Result.controller.js';


// Controller to create a new interview
export const createInterview = async (req,res) => {
    try {
        const {company,date,userId,createdFor} = req.body;
        // Check if companyId, date, and userId are provided
        if(!company || !date || !userId || !createdFor || createdFor?.length == 0 || createdFor.some((value) => {return !mongoose.isValidObjectId(value)})) {
            return res.status(400).json(ResponseFormat(400,'Validation Error',null,false,'companyId, date, createdFor, and userId are required'));
        }

        // Check if the user exists
        const user = await User.findById(userId);
        const student = await Student.findOne({_id: createdFor,userId: userId});

        if(!user) {
            return res.status(404).json(ResponseFormat(404,'User not found'));
        }

        if(!student) {
            return res.status(404).json(ResponseFormat(404,'Student not found'));
        }

        // Create a new interview
        const newInterview = new Interview({
            company: company,
            date: date,
            createdFor,
            userId,
        });

        await newInterview.save();

        if(!newInterview) {
            return res.status(500).json(ResponseFormat(500,'Can not create Interview '));
        }
        // Create "Didn’t Attempt" result
        // const resultData = {
        //     studentId: createdFor,
        //     company: company,
        //     result: 'Didn’t Attempt',
        //     userId: userId,
        // };
        // Call createResult function from ResultController
        await createResultWithData(createdFor,
            newInterview._id,
            'Didn’t Attempt',
            userId);

        return res.status(201).json(ResponseFormat(201,'Interview created',newInterview));
    } catch(error) {
        console.error('Error creating interview:',error);
        return res.status(500).json(ResponseFormat(500,'Internal Server Error',null,false,error.message));
    }
};

// get students details by interview id 
export const getStudentDetailsByInterviewId = async (interviewId) => {
    try {
        // Aggregate pipeline to match the interview by its ID and populate the createdFor field
        const interviewAggregate = await Interview.aggregate([
            {$match: {_id: new mongoose.Types.ObjectId(interviewId)}},
            {$lookup: {from: 'students',localField: 'createdFor',foreignField: '_id',as: 'students'}},
            {$unwind: "$students"}, // Unwind to work with each student individually
            {
                $lookup: {
                    from: 'results',
                    let: {companyId: "$_id",otherUserId: "$students._id"},
                    pipeline: [
                        {$match: {$expr: {$and: [{$eq: ["$student","$$otherUserId"]},{$eq: ["$company","$$companyId"]}]}}},
                        {$project: {_id: 1,result: 1}} // Include _id (resultId) and result fields
                    ],
                    as: 'result'
                }
            },
            {$unwind: {path: "$result",preserveNullAndEmptyArrays: true}} // Preserve students with no results
        ]);

        // Check if the interview exists
        if(interviewAggregate.length === 0) {
            return ResponseFormat(404,'Interview not found',null,false,'Interview not found');
        }

        const students = interviewAggregate.map(interview => ({
            ...interview.students,
            resultId: interview.result ? interview.result._id : null, // Include the resultId or null if no result
            result: interview.result ? interview.result.result : 'No result' // Include the result or default to 'No result'
        }));

        // Check if students are found for the interview
        if(students.length === 0) {
            return ResponseFormat(404,'No students found for this interview',null,false,'No students found for this interview');
        }

        return ResponseFormat(200,'Student details fetched successfully',students);
    } catch(error) {
        console.error('Error fetching student details by interview ID:',error);
        return ResponseFormat(500,'Internal server error',null,false,'Internal server error');
    }
};
