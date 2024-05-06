import {Batch} from "../models/Batch.models.js";
import {ResponseFormat} from "../utils/ResponseFormat.js";

// POST /api/batch
export async function createBatch(req,res) {
    const {name,userId} = req.body;

    try {
        const batch = new Batch({name,userId});
        await batch.save();

        const response = ResponseFormat(201,'Batch created successfully',batch);
        res.status(201).json(response);
    } catch(err) {
        const response = ResponseFormat(500,'Unable to create batch',null,false,err.message);
        res.status(500).json(response);
    }
}

// GET /api/batch/:userId
export async function getBatchesByUser(req,res) {
    const userId = req.params.userId;

    try {
        const userBatches = await Batch.find({userId}).select("-__v");
        const response = ResponseFormat(200,'Batches fetched successfully',userBatches);
        res.status(200).json(response);
    } catch(err) {
        const response = ResponseFormat(500,'Unable to fetch batches',null,false,err.message);
        res.status(500).json(response);
    }
}