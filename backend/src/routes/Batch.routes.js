import {Router} from "express";
import {createBatch,getBatchesByUser} from "../controllers/Batch.controller.js";

export const batchRouter = Router();


// create batches
batchRouter.post('/',createBatch);

// Get Batches
batchRouter.get('/:userId',getBatchesByUser);