import express from 'express'
import protect from '../middlewares/authMiddlewares.js';
import { createResume, updateResume, deleteResume } from '../controller/resumeController.js';
import upload from '../configs/multer.js';
const resumeRouter = express.Router();

resumeRouter.post('/create' , protect, createResume) 
resumeRouter.put('/update', upload.single('image'), protect, updateResume );
resumeRouter.delete('/delete/:resumeId', protect, deleteResume );
resumeRouter.get('/get/',protect, updateResume );


export default resumeRouter