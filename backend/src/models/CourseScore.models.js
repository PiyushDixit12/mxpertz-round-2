
import mongoose from 'mongoose';

const {Schema} = mongoose;

const courseScoreSchema = new Schema({
    webDevelopment: {
        type: String,
        required: true,
    },
    reactJs: {
        type: String,
        required: true,
    },
    dsa: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    resultId: {
        type: Schema.Types.ObjectId,
        ref: 'Result',
        required: true,
    },
},{timestamps: true});

export const CourseScore = mongoose.model('CourseScore',courseScoreSchema);

