
import {Schema,model} from "mongoose";

const resultSchema = new Schema({
    student: {type: Schema.Types.ObjectId,ref: 'Student'},
    company: String,
    result: {type: String,enum: ['PASS','FAIL','On Hold','Didn’t Attempt']},
    userId: {type: Schema.Types.ObjectId,ref: 'User'} // Reference to the User model
});

export const Result = model('Result',resultSchema);
