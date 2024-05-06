
import mongoose from 'mongoose';


const interviewSchema = new mongoose.Schema({
    company: {type: String,required: true},
    date: {type: String,required: true},
    createdFor: {type: mongoose.Schema.Types.ObjectId,ref: 'Student',required: true},
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
});

export const Interview = mongoose.model('Interview',interviewSchema);

