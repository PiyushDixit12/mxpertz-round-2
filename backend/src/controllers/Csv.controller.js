
import {Student} from "../models/Student.models.js";
import mongoose from "mongoose";
import {convertInterviewToCSV,convertStudentToCSV} from "../utils/convertStudentToCsv.js";
import {Interview} from "../models/Interview.models.js";
import {Result} from "../models/Result.models.js";




// controller to download csv of students details
export const studentsToCsv = async (req,res) => {
    const {userId} = req.params;

    // Check if userId is a valid ObjectId
    if(!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({error: 'Invalid user ID'});
    }

    try {
        // Find the student by userId
        const student = await Student.find({userId});

        if(!student) {
            return res.status(404).json({error: 'Student not found'});
        }

        const csvData = convertStudentToCSV(student);

        // Send the CSV file as response
        res.header('Content-Type','text/csv');
        res.attachment('student.csv'); // Optional: Set filename
        res.send(csvData);
    } catch(error) {
        console.error('Error:',error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

// to convert interview details to csv
export const interviewToCsv = async (req,res) => {
    const {userId} = req.params;

    try {
        const interviews = await Interview.find({userId});
        console.log("interviews are ",interviews);

        if(!interviews || interviews.length === 0) {
            return; // Assuming you want to exit the function if there are no interviews
        }

        let promises = [];
        let data = [];

        interviews.forEach(interview => {
            interview.createdFor.forEach(studentId => {
                let promise = Student.findById(studentId)
                    .then(student => {
                        console.log("student ",student);
                        if(student) {
                            data.push({
                                ...student.toObject(),
                                companyId: interview._id,
                                company: interview.company,
                                date: interview.date.toString()
                            });
                        }
                    })
                    .catch(error => console.error("Error finding student:",error));
                promises.push(promise);
            });
        });

        await Promise.all(promises);
        console.log("Data is ",data);

        // Now, let's find results for each student concurrently
        let userResultPromises = data.map(async value => {
            return Result.findOne({student: value._id,userId: userId,company: value.companyId}).then(val => {
                console.log("val is ",val);
                return {...value,result: val.result};
            });
        });

        let userResult = await Promise.all(userResultPromises);

        const csv = convertInterviewToCSV(userResult);
        res.header('Content-Type','text/csv');
        res.attachment('interview.csv'); // Optional: Set filename
        res.send(csv);
        console.log("user Result",userResult);
    } catch(error) {
        console.error("Error:",error);
    }



};