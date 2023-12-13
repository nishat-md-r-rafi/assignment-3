import { Router } from 'express';
import { courseController } from './course.controller';

const router = Router();

router.post('/', courseController.createCourse);

export const courseRouter = router;
