
import mongoose from "mongoose";

// Used to connect Db
export async function connectDB() {

    await mongoose.connect(process.env.MONGODB_URL + "/mxpertz-round-2").then((value) => {
        console.log("MONGODB Connected successfully!");
    }).catch(err => {
        console.log("MONGODB Connection Failed " + err)
    });
};