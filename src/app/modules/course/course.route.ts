import { Router } from 'express';
import { courseController } from './course.controller';

const router = Router();
export const coursesRouter = Router();

router.post('/', courseController.createCourse);
coursesRouter.get('/', courseController.getCourses);

export const courseRouter = router;
