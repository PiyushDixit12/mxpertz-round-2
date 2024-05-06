
import mongoose from "mongoose";

export async function connectDB() {

    await mongoose.connect(process.env.MONGODB_URL + "/interview-practice").then((value) => {
        console.log("MONGODB Connected successfully!");
    }).catch(err => {
        console.log("MONGODB Connection Failed " + err)
    });
};