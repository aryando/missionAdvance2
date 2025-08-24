import express from 'express';
import {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} from '../controllers/courseController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', upload.single('image'), createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;