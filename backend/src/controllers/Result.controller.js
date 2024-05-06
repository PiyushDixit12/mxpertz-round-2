
import {Types} from 'mongoose';
import {isValidObjectId} from 'mongoose';
import {Result} from '../models/Result.models.js';
import {CourseScore} from '../models/CourseScore.models.js'
import {ResponseFormat} from '../utils/ResponseFormat.js';
import {isNumeric} from '../utils/IsNumeric.js';

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
const createResultWithData = async (studentIds = [],company,result,userId) => {
    try {
        const response = studentIds.map(async (value) => {
            const newResult = new Result({student: value,company,result,userId});
        await newResult.validate(); // Validate the new result against the schema
            return await newResult.save();
        });

        return response; // Return the created data
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

// Controller function to create course score and generate result
export const createCourseScoreAndUpdateResult = async (req,res) => {
    try {
        const {webDevelopment,reactJs,dsa,resultId,userId,studentId} = req.body;

        // Validation: Check if scores are valid numbers
        if(!isNumeric(webDevelopment) || !isNumeric(reactJs) || !isNumeric(dsa)) {
            return res.status(400).json(ResponseFormat('error','Invalid score format'));
        }

        // Validation: Check if userId and studentId are valid ObjectIDs
        if(!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(studentId) || !Types.ObjectId.isValid(resultId)) {
            return res.status(400).json(ResponseFormat('error','Invalid userId or studentId'));
        }

        // Calculate total score
        const totalScore = parseInt(webDevelopment) + parseInt(reactJs) + parseInt(dsa);
        console.log("total score ",totalScore)
        // Determine result based on total score
        let result;
        if(totalScore >= 69) {
            result = 'PASS';
        } else if(totalScore >= 46) {
            result = 'On Hold';
        } else {
            result = 'FAIL';
        }

        // Create course score
        const courseScore = new CourseScore({
            webDevelopment,
            reactJs,
            dsa,
            userId,
            studentId,
            resultId
        });

        // Save course score
        await courseScore.save();

        // Create result
        await updateResultWithData(resultId,studentId,result,userId)

        res.status(201).json(ResponseFormat('success','Course score and result generated successfully'));
    } catch(error) {
        console.error(error);
        res.status(500).json(ResponseFormat('error','Internal server error',null,false,error.message));
    }
};


// Export the function
export {createResult,createResultWithData,updateResult};
