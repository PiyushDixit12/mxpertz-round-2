import mongoose from 'mongoose';


const StudentSchema = new mongoose.Schema({
    name: {type: String,required: true},
    college: {type: String,required: true},
    status: {type: String,enum: ['placed','not_placed'],required: true},
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},

});

export const Student = mongoose.model('Student',StudentSchema);


