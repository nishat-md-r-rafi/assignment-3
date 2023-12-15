import { Router } from 'express';
import { courseController } from './course.controller';

export const courseRouter = Router();
export const coursesRouter = Router();

courseRouter.post('/', courseController.createCourse);
courseRouter.get('/best', courseController.getBestCourse);

coursesRouter.get('/', courseController.getCourses);
coursesRouter.get('/:courseId/reviews', courseController.getCourseReviews);
coursesRouter.put('/:courseId', courseController.getCourseReviews);
