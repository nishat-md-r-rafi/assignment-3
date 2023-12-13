import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = await Category.find().select('-__v');
  return result;
};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB
};
