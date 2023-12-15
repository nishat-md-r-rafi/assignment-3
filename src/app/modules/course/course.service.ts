import { Review } from '../review/review.model';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);

  return result;
};

const getCoursesFromDB = async (query: Record<string, unknown>) => {
  const copiedQuery = { ...query };

  // PAGINATION
  const limit: number = Number(query?.limit) || 10;
  const page: number = Number(query?.page) || 1;
  const skip: number = page > 1 ? (page - 1) * limit : 0;

  // RANGING
  const minPrice = Number(query?.minPrice) || 0;
  const maxPrice = Number(query?.minPrice) || Infinity;

  const searchQuery = Course.find({
    price: { $gte: minPrice, $lte: maxPrice },
  })
    .skip(skip)
    .limit(limit);

  // SORT
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortObj: { [key: string]: any } = {};
  const sortTerm: string = (query?.sortBy as string) || 'createdAt';
  const sortOrder: number = query.sortOrder === 'asc' ? 1 : -1;
  sortObj[sortTerm] = sortOrder;

  const sortQuery = searchQuery.sort(sortObj);

  // FILTER
  const excludeFields = [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
    'minPrice',
    'maxPrice',
  ];
  excludeFields.forEach((el) => delete copiedQuery[el]);

  const filterQuery = sortQuery.find(copiedQuery).populate('categoryId');

  return await filterQuery;
};

const getCourseReviewsFromDB = async (id: string) => {
  const reviews = await Review.find({ courseId: id });
  const course = await Course.findById(id).select('-reviews');
  return { course, reviews };
};

const getBestCourseFromDB = async () => {
  const bestCourseReviewsandRatings = await Review.aggregate([
    {
      $group: {
        _id: '$courseId',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
    {
      $limit: 1,
    },
  ]);

  const course = await Course.findById(
    bestCourseReviewsandRatings[0]?._id,
  ).select('-reviews -__v');

  return { course, ...bestCourseReviewsandRatings[0] };
};

export const courseService = {
  createCourseIntoDB,
  getCoursesFromDB,
  getCourseReviewsFromDB,
  getBestCourseFromDB,
};
