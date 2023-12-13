import { Router } from 'express';
import { categoryRouter } from '../modules/category/category.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/categories',
    route: categoryRouter,
  },
];

moduleRoutes.map((route) => router.use(route.path, route.route));

export default router;
