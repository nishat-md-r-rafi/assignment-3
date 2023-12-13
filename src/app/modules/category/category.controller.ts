import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { categoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoriesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

export const categoryController = {
  createCategory,
  getAllCategories,
};
