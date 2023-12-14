import { Router } from 'express';
import { categoryRouter } from '../modules/category/category.route';
import { reviwRouter } from '../modules/review/review.route';
import { courseRouter, coursesRouter } from '../modules/course/course.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/categories',
    route: categoryRouter,
  },
  {
    path: '/reviews',
    route: reviwRouter,
  },
  {
    path: '/course',
    route: courseRouter,
  },
  {
    path: '/courses',
    route: coursesRouter,
  },
];

moduleRoutes.map((route) => router.use(route.path, route.route));

export default router;
