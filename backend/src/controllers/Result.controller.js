// ResultController.js

import {isValidObjectId} from 'mongoose';
import {Result} from '../models/Result.models.js';
import {ResponseFormat} from '../utils/ResponseFormat.js';

// Function to create a new result with data validation
const createResult = async (req,res) => {
    try {
        const {studentId,company,result,userId} = req.body;

        // Validate required fields
        if(!studentId || !company || !result || !userId) {
            throw new Error('Required fields missing');
        }

        // Validate result value
        if(!['PASS','FAIL','On Hold','Didn’t Attempt'].includes(result)) {
            throw new Error('Invalid result value');
        }

        // Validate userId as a valid ObjectId
        if(!isValidObjectId(userId) || !isValidObjectId(studentId)) {
            throw new Error('Invalid userId or studentId');
        }



        const newResult = new Result({student: studentId,company,result,userId});
        await newResult.validate(); // Validate the new result against the schema
        await newResult.save();

        // Create a successful response format
        const response = ResponseFormat(200,'Result created successfully',newResult);
        res.status(201).json(response); // Send the response
    } catch(error) {
        // Create an error response format
        const response = ResponseFormat(400,'Error creating result',null,false,error.message);
        res.status(400).json(response); // Send the error response
    }
};

// Function to create a result and return the created data
const createResultWithData = async (studentId,company,result,userId) => {
    try {
        const newResult = new Result({student: studentId,company,result,userId});
        await newResult.validate(); // Validate the new result against the schema
        await newResult.save();
        return newResult; // Return the created data
    } catch(error) {
        throw new Error(`Error creating result: ${error.message}`);
    }
};

// Function to update a result by ID
const updateResult = async (req,res) => {
    try {
        const {resultId,studentId,result,userId} = req.body;

        const updatedResult = await updateResultWithData(resultId,studentId,result,userId)

        // Create a successful response format
        const response = ResponseFormat(200,'Result updated successfully',updatedResult);
        res.status(200).json(response); // Send the response
    } catch(error) {
        // Create an error response format
        const response = ResponseFormat(400,'Error updating result',null,false,error.message);
        res.status(400).json(response); // Send the error response
    }
};

const updateResultWithData = async (resultId,studentId,result,userId) => {
    try {
        // Validate required fields
        if(!resultId || !studentId || !result || !userId) {
            throw new Error('Required fields missing');
        }

        // Validate result value
        if(!['PASS','FAIL','On Hold','Didn’t Attempt'].includes(result)) {
            throw new Error('Invalid result value');
        }

        // Validate userId, studentId, and resultId as valid ObjectIds
        if(!isValidObjectId(userId) || !isValidObjectId(studentId) || !isValidObjectId(resultId)) {
            throw new Error('Invalid userId or studentId or resultId');
        }

        // Find and update the result
        const updatedResult = await Result.findOneAndUpdate(
            {$and: [{_id: resultId},{student: studentId},{userId: userId}]},
            {$set: {result}},
            {new: true}
        );

        if(!updatedResult) {
            throw new Error('Result not found');
        }

        return updatedResult; // Return the updated data
    } catch(error) {
        throw new Error(`Error updating result: ${error.message}`);
    }
};

// Export the function
export {createResult,createResultWithData,updateResult};
