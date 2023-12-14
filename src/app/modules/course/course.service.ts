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
  const sortObj = {};
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

  // console.log(sortObj);

  return await filterQuery;
};

export const courseService = {
  createCourseIntoDB,
  getCoursesFromDB,
};
